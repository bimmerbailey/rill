package route

import (
	"net/http"
	"time"

	"github.com/RichardKnop/machinery/v1"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/go-redis/redis/v8"
	"github.com/jmoiron/sqlx"
	log "github.com/sirupsen/logrus"

	"github.com/bimmerbailey/rill/internal/config"
	"github.com/bimmerbailey/rill/internal/db"
	"github.com/bimmerbailey/rill/internal/graph"
	"github.com/bimmerbailey/rill/internal/jobs"
	"github.com/bimmerbailey/rill/internal/logger"
)

// TaskcafeHandler contains all the route handlers
type TaskcafeHandler struct {
	repo      db.Repository
	AppConfig config.AppConfig
}

// NewRouter creates a new router for chi
func NewRouter(dbConnection *sqlx.DB, redisClient *redis.Client, jobServer *machinery.Server, appConfig config.AppConfig) (chi.Router, error) {
	formatter := new(log.TextFormatter)
	formatter.TimestampFormat = "02-01-2006 15:04:05"
	formatter.FullTimestamp = true

	routerLogger := log.New()
	routerLogger.SetLevel(log.InfoLevel)
	routerLogger.Formatter = formatter
	r := chi.NewRouter()
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(logger.NewStructuredLogger(routerLogger))
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(60 * time.Second))

	r.Use(cors.Handler(cors.Options{
		// AllowedOrigins:   []string{"https://foo.com"}, // Use this to allow specific origin hosts
		AllowedOrigins: []string{"https://*", "http://*"},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Cookie", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))

	repository := db.NewRepository(dbConnection)
	taskcafeHandler := TaskcafeHandler{*repository, appConfig}

	var imgServer = http.FileServer(http.Dir("./uploads/"))
	r.Group(func(mux chi.Router) {
		mux.Mount("/auth", authResource{}.Routes(taskcafeHandler))
		mux.Handle("/__graphql", graph.NewPlaygroundHandler("/graphql"))
		mux.Mount("/uploads/", http.StripPrefix("/uploads/", imgServer))
		mux.Post("/auth/confirm", taskcafeHandler.ConfirmUser)
		mux.Post("/auth/register", taskcafeHandler.RegisterUser)
		mux.Get("/settings", taskcafeHandler.PublicSettings)
		mux.Post("/logger", taskcafeHandler.HandleClientLog)
	})
	auth := AuthenticationMiddleware{*repository}
	jobQueue := jobs.JobQueue{
		Repository: *repository,
		AppConfig:  appConfig,
		Server:     jobServer,
	}
	r.Group(func(mux chi.Router) {
		mux.Use(auth.Middleware)
		mux.Post("/users/me/avatar", taskcafeHandler.ProfileImageUpload)
		mux.Mount("/graphql", graph.NewHandler(*repository, appConfig, jobQueue, redisClient))
	})

	return r, nil
}
