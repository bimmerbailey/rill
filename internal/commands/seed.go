package commands

import (
	"context"
	"fmt"
	"time"

	"github.com/brianvoe/gofakeit/v5"
	"github.com/google/uuid"
	"github.com/manifoldco/promptui"
	"golang.org/x/crypto/bcrypt"

	"github.com/bimmerbailey/rill/internal/db"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"

	"github.com/jmoiron/sqlx"
	log "github.com/sirupsen/logrus"
)

type seedUser struct {
	FullName string
	Username string
	Email    string
	Initials string
	Password string
	RoleCode string
	Active   bool
}

var seedUsers = []seedUser{
	{
		FullName: "Admin User",
		Username: "admin",
		Email:    "admin@rill.dev",
		Initials: "AU",
		Password: "password",
		RoleCode: "admin",
		Active:   true,
	},
	{
		FullName: "Regular User",
		Username: "user",
		Email:    "user@rill.dev",
		Initials: "RU",
		Password: "password",
		RoleCode: "member",
		Active:   true,
	},
	{
		FullName: "Outsider User",
		Username: "outsider",
		Email:    "outsider@rill.dev",
		Initials: "OU",
		Password: "password",
		RoleCode: "member",
		Active:   true,
	},
}

var (
	teams      int
	projects   int
	taskGroups int
	tasks      int
)

func newSeedCmd() *cobra.Command {
	cc := &cobra.Command{
		Use:   "seed",
		Short: "Seeds the database with random data for testing",
		Long:  "Seeds the database with random data for testing. CAN NOT BE UNDONE.",
		RunE: func(cmd *cobra.Command, args []string) error {
			Formatter := new(log.TextFormatter)
			Formatter.TimestampFormat = "02-01-2006 15:04:05"
			Formatter.FullTimestamp = true
			log.SetFormatter(Formatter)
			log.SetLevel(log.InfoLevel)

			connection := fmt.Sprintf("user=%s password=%s host=%s dbname=%s port=%s sslmode=disable",
				viper.GetString("database.user"),
				viper.GetString("database.password"),
				viper.GetString("database.host"),
				viper.GetString("database.name"),
				viper.GetString("database.port"),
			)
			var dbConnection *sqlx.DB
			var err error
			var retryDuration time.Duration
			maxRetryNumber := 4
			for i := 0; i < maxRetryNumber; i++ {
				dbConnection, err = sqlx.Connect("postgres", connection)
				if err == nil {
					break
				}
				retryDuration = time.Duration(i*2) * time.Second
				log.WithFields(log.Fields{"retryNumber": i, "retryDuration": retryDuration}).WithError(err).Error("issue connecting to database, retrying")
				if i != maxRetryNumber-1 {
					time.Sleep(retryDuration)
				}
			}
			if err != nil {
				return err
			}
			dbConnection.SetMaxOpenConns(25)
			dbConnection.SetMaxIdleConns(25)
			dbConnection.SetConnMaxLifetime(5 * time.Minute)
			defer dbConnection.Close()

			if viper.GetBool("migrate") {
				log.Info("running auto schema migrations")
				if err = runMigration(dbConnection); err != nil {
					return err
				}
			}

			prompt := promptui.Prompt{
				Label:     "Seed database",
				IsConfirm: true,
			}

			_, err = prompt.Run()

			if err != nil {
				return err
			}

			ctx := context.Background()
			repository := db.NewRepository(dbConnection)
			now := time.Now().UTC()

			// --- Create seed users ---
			log.Info("creating seed users")
			createdUsers := make([]db.UserAccount, 0, len(seedUsers))
			for _, su := range seedUsers {
				hashedPwd, err := bcrypt.GenerateFromPassword([]byte(su.Password), 14)
				if err != nil {
					return fmt.Errorf("hashing password for %s: %w", su.Username, err)
				}
				user, err := repository.CreateUserAccount(ctx, db.CreateUserAccountParams{
					FullName:     su.FullName,
					Username:     su.Username,
					Email:        su.Email,
					Initials:     su.Initials,
					PasswordHash: string(hashedPwd),
					CreatedAt:    now,
					RoleCode:     su.RoleCode,
					Active:       su.Active,
				})
				if err != nil {
					return fmt.Errorf("creating user %s: %w", su.Username, err)
				}
				createdUsers = append(createdUsers, user)
				log.WithFields(log.Fields{"username": su.Username, "email": su.Email, "role": su.RoleCode}).Info("created user")
			}

			// Users with access to seeded teams/projects (first two)
			// The third user ("outsider") intentionally gets no access
			usersWithAccess := []struct {
				UserID   uuid.UUID
				RoleCode string
			}{
				{createdUsers[0].UserID, "admin"},
				{createdUsers[1].UserID, "member"},
			}

			// --- Create teams, projects, task groups, and tasks ---
			organizations, err := repository.GetAllOrganizations(ctx)
			if err != nil {
				return fmt.Errorf("getting organizations: %w", err)
			}
			organizationId := organizations[0].OrganizationID

			for teamIdx := 0; teamIdx <= teams; teamIdx++ {
				teamName := gofakeit.Company()
				team, err := repository.CreateTeam(ctx, db.CreateTeamParams{
					Name:           teamName,
					CreatedAt:      now,
					OrganizationID: organizationId,
				})
				if err != nil {
					return err
				}

				// Add users with access as team members
				for _, u := range usersWithAccess {
					_, err := repository.CreateTeamMember(ctx, db.CreateTeamMemberParams{
						TeamID:    team.TeamID,
						UserID:    u.UserID,
						Addeddate: now,
						RoleCode:  u.RoleCode,
					})
					if err != nil {
						return fmt.Errorf("adding team member: %w", err)
					}
				}

				for projectIdx := 0; projectIdx <= projects; projectIdx++ {
					projectName := gofakeit.Dessert()
					project, err := repository.CreateTeamProject(ctx, db.CreateTeamProjectParams{
						TeamID:    team.TeamID,
						Name:      projectName,
						CreatedAt: now,
					})
					if err != nil {
						return err
					}

					// Add users with access as project members
					for _, u := range usersWithAccess {
						_, err := repository.CreateProjectMember(ctx, db.CreateProjectMemberParams{
							ProjectID: project.ProjectID,
							UserID:    u.UserID,
							RoleCode:  u.RoleCode,
							AddedAt:   now,
						})
						if err != nil {
							return fmt.Errorf("adding project member: %w", err)
						}
					}

					for taskGroupIdx := 0; taskGroupIdx <= taskGroups; taskGroupIdx++ {
						taskGroupName := gofakeit.LoremIpsumSentence(8)
						taskGroup, err := repository.CreateTaskGroup(ctx, db.CreateTaskGroupParams{
							Name:      taskGroupName,
							ProjectID: project.ProjectID,
							CreatedAt: now,
							Position:  float64(65535 * (taskGroupIdx + 1)),
						})
						if err != nil {
							return err
						}
						for taskIdx := 0; taskIdx <= tasks; taskIdx++ {
							taskName := gofakeit.Sentence(8)
							task, err := repository.CreateTask(ctx, db.CreateTaskParams{
								Name:        taskName,
								TaskGroupID: taskGroup.TaskGroupID,
								CreatedAt:   now,
								Position:    float64(65535 * (taskIdx + 1)),
							})
							if err != nil {
								return err
							}
							fmt.Printf("Creating %d / %d / %d / %d - %d\n", teamIdx, projectIdx, taskGroupIdx, taskIdx, task.TaskID)
						}
					}
				}
			}

			log.Info("seed complete")
			log.Info("seed users created:")
			for _, su := range seedUsers {
				log.WithFields(log.Fields{"username": su.Username, "password": su.Password, "email": su.Email}).Info("  credentials")
			}

			return nil
		},
	}

	cc.Flags().Bool("migrate", false, "if true, auto run's schema migrations before seeding")
	viper.BindPFlag("migrate", cc.Flags().Lookup("migrate"))
	cc.Flags().IntVar(&teams, "teams", 5, "number of teams to generate")
	cc.Flags().IntVar(&projects, "projects", 10, "number of projects to create per team (personal projects are included)")
	cc.Flags().IntVar(&taskGroups, "task_groups", 5, "number of task groups to generate per project")
	cc.Flags().IntVar(&tasks, "tasks", 25, "number of tasks to generate per task group")

	viper.SetDefault("migrate", false)
	return cc
}
