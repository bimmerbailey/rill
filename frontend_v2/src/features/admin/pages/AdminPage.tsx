import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Button } from "@/components/common";

// GraphQL Queries and Mutations
const GET_USERS = gql`
  query GetUsers {
    invitedUsers {
      id
      email
      invitedOn
    }
    users {
      id
      email
      fullName
      username
      role {
        code
        name
      }
      profileIcon {
        url
        initials
        bgColor
      }
      owned {
        teams {
          id
          name
        }
        projects {
          id
          name
        }
      }
      member {
        teams {
          id
          name
        }
        projects {
          id
          name
        }
      }
    }
  }
`;

const CREATE_USER_ACCOUNT = gql`
  mutation CreateUserAccount(
    $email: String!
    $username: String!
    $fullName: String!
    $initials: String!
    $password: String!
    $roleCode: String!
  ) {
    createUserAccount(
      input: {
        email: $email
        username: $username
        fullName: $fullName
        initials: $initials
        password: $password
        roleCode: $roleCode
      }
    ) {
      id
      email
      fullName
      username
      role {
        code
        name
      }
      profileIcon {
        url
        initials
        bgColor
      }
    }
  }
`;

const DELETE_USER_ACCOUNT = gql`
  mutation DeleteUserAccount($userID: UUID!, $newOwnerID: UUID) {
    deleteUserAccount(input: { userID: $userID, newOwnerID: $newOwnerID }) {
      userAccount {
        id
        email
        fullName
      }
    }
  }
`;

const DELETE_INVITED_USER_ACCOUNT = gql`
  mutation DeleteInvitedUserAccount($invitedUserID: UUID!) {
    deleteInvitedUserAccount(input: { invitedUserID: $invitedUserID }) {
      invitedUser {
        id
        email
      }
    }
  }
`;

interface User {
  id: string;
  email: string;
  fullName: string;
  username: string;
  role: {
    code: string;
    name: string;
  };
  profileIcon?: {
    url?: string;
    initials?: string;
    bgColor?: string;
  };
  owned: {
    teams: Array<{ id: string; name: string }>;
    projects: Array<{ id: string; name: string }>;
  };
  member: {
    teams: Array<{ id: string; name: string }>;
    projects: Array<{ id: string; name: string }>;
  };
}

interface InvitedUser {
  id: string;
  email: string;
  invitedOn: string;
}

/**
 * Admin Page with "Soft Canvas — Evening" dark theme
 */
export function AdminPage() {
  const [activeTab, setActiveTab] = useState<"users" | "invited">("users");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [invitedUserToDelete, setInvitedUserToDelete] =
    useState<InvitedUser | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    initials: "",
    password: "",
    roleCode: "member",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Dark palette
  const base = "#141211";
  const surface0 = "var(--color-surface-0)";
  const surface1 = "var(--color-surface-1)";
  const surface2 = "var(--color-surface-2)";
  const surface3 = "var(--color-surface-3)";
  const border = "var(--color-border)";
  const textPrimary = "var(--color-text-primary)";
  const textSecondary = "var(--color-text-secondary)";
  const textTertiary = "var(--color-text-tertiary)";
  const terracotta = "var(--color-terracotta)";
  const sage = "var(--color-sage)";
  const slate = "var(--color-slate)";

  // GraphQL operations
  const { data, loading, error, refetch } = useQuery(GET_USERS);

  const [createUser, { loading: creatingUser }] = useMutation(
    CREATE_USER_ACCOUNT,
    {
      onCompleted: () => {
        setShowAddUserModal(false);
        setFormData({
          fullName: "",
          email: "",
          username: "",
          initials: "",
          password: "",
          roleCode: "member",
        });
        setFormErrors({});
        refetch();
      },
      onError: (error) => {
        setFormErrors({ email: error.message });
      },
    },
  );

  const [deleteUser, { loading: deletingUser }] = useMutation(
    DELETE_USER_ACCOUNT,
    {
      onCompleted: () => {
        setUserToDelete(null);
        refetch();
      },
    },
  );

  const [deleteInvitedUser, { loading: deletingInvitedUser }] = useMutation(
    DELETE_INVITED_USER_ACCOUNT,
    {
      onCompleted: () => {
        setInvitedUserToDelete(null);
        refetch();
      },
    },
  );

  const users: User[] = data?.users || [];
  const invitedUsers: InvitedUser[] = data?.invitedUsers || [];

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.username.trim()) errors.username = "Username is required";
    if (!formData.initials.trim()) errors.initials = "Initials are required";
    if (!formData.password.trim()) errors.password = "Password is required";
    if (formData.password.length < 8)
      errors.password = "Password must be at least 8 characters";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    await createUser({
      variables: {
        ...formData,
        roleCode: formData.roleCode,
      },
    });
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    await deleteUser({
      variables: { userID: userToDelete.id },
    });
  };

  const handleDeleteInvitedUser = async () => {
    if (!invitedUserToDelete) return;
    await deleteInvitedUser({
      variables: { invitedUserID: invitedUserToDelete.id },
    });
  };

  if (loading) {
    return (
      <div
        className="min-h-screen p-8"
        style={{
          background: `linear-gradient(160deg, ${base} 0%, ${surface0} 50%, ${base} 100%)`,
          color: textPrimary,
        }}
      >
        <div className="max-w-6xl mx-auto animate-pulse space-y-6">
          <div
            style={{
              background: surface2,
              height: "40px",
              width: "200px",
              borderRadius: "10px",
            }}
          />
          <div
            style={{
              background: surface1,
              height: "400px",
              borderRadius: "20px",
              border: `1px solid ${border}`,
            }}
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen p-8"
        style={{
          background: `linear-gradient(160deg, ${base} 0%, ${surface0} 50%, ${base} 100%)`,
          color: textPrimary,
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div
            style={{
              background: surface1,
              borderRadius: "20px",
              border: `1px solid ${border}`,
              padding: "2rem",
            }}
          >
            <h2
              style={{
                fontFamily: "'Libre Baskerville', serif",
                color: terracotta,
                fontSize: "1.2rem",
                marginBottom: "0.5rem",
              }}
            >
              Error loading admin data
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: textSecondary,
              }}
            >
              {error.message}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(160deg, ${base} 0%, ${surface0} 50%, ${base} 100%)`,
        color: textPrimary,
      }}
    >
      <div className="max-w-6xl mx-auto px-8 py-10">
        {/* Header */}
        <header style={{ animation: "d2dFadeUp 0.7s ease-out" }}>
          <h1
            style={{
              fontFamily: "'Libre Baskerville', Georgia, serif",
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontWeight: 400,
              color: textPrimary,
            }}
          >
            Admin
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.9rem",
              color: textSecondary,
              marginTop: "0.5rem",
            }}
          >
            Manage users and system settings
          </p>
        </header>

        {/* Stats */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
          style={{ animation: "d2dFadeUp 0.7s ease-out 0.1s both" }}
        >
          <div
            style={{
              background: surface1,
              borderRadius: "16px",
              border: `1px solid ${border}`,
              padding: "1.5rem",
            }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                color: textTertiary,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Total Users
            </p>
            <p
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "2rem",
                color: textPrimary,
                marginTop: "0.5rem",
              }}
            >
              {users.length}
            </p>
          </div>
          <div
            style={{
              background: surface1,
              borderRadius: "16px",
              border: `1px solid ${border}`,
              padding: "1.5rem",
            }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                color: textTertiary,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Invited Users
            </p>
            <p
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "2rem",
                color: textPrimary,
                marginTop: "0.5rem",
              }}
            >
              {invitedUsers.length}
            </p>
          </div>
          <div
            style={{
              background: surface1,
              borderRadius: "16px",
              border: `1px solid ${border}`,
              padding: "1.5rem",
            }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                color: textTertiary,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Admins
            </p>
            <p
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "2rem",
                color: textPrimary,
                marginTop: "0.5rem",
              }}
            >
              {users.filter((u) => u.role?.code === "admin").length}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div
          className="flex items-center justify-between mt-10 mb-6"
          style={{ animation: "d2dFadeUp 0.7s ease-out 0.2s both" }}
        >
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("users")}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "10px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9rem",
                fontWeight: 500,
                background: activeTab === "users" ? surface2 : "transparent",
                color: activeTab === "users" ? textPrimary : textSecondary,
                border: `1px solid ${activeTab === "users" ? border : "transparent"}`,
              }}
            >
              Users ({users.length})
            </button>
            <button
              onClick={() => setActiveTab("invited")}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "10px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9rem",
                fontWeight: 500,
                background: activeTab === "invited" ? surface2 : "transparent",
                color: activeTab === "invited" ? textPrimary : textSecondary,
                border: `1px solid ${activeTab === "invited" ? border : "transparent"}`,
              }}
            >
              Invited ({invitedUsers.length})
            </button>
          </div>
          <Button
            onClick={() => setShowAddUserModal(true)}
            style={{
              background: terracotta,
              color: surface0,
              borderRadius: "8px",
            }}
          >
            <span
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
            >
              + Add User
            </span>
          </Button>
        </div>

        {/* Users Table */}
        {activeTab === "users" && (
          <div style={{ animation: "d2dFadeUp 0.7s ease-out 0.3s both" }}>
            <div
              style={{
                background: surface1,
                borderRadius: "20px",
                border: `1px solid ${border}`,
                overflow: "hidden",
              }}
            >
              {users.length === 0 ? (
                <div className="p-8 text-center">
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: textSecondary,
                    }}
                  >
                    No users found
                  </p>
                </div>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${border}` }}>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.75rem",
                          color: textTertiary,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          fontWeight: 600,
                        }}
                      >
                        User
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.75rem",
                          color: textTertiary,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          fontWeight: 600,
                        }}
                      >
                        Role
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.75rem",
                          color: textTertiary,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          fontWeight: 600,
                        }}
                      >
                        Teams
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.75rem",
                          color: textTertiary,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          fontWeight: 600,
                        }}
                      >
                        Projects
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "right",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.75rem",
                          color: textTertiary,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          fontWeight: 600,
                        }}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr
                        key={user.id}
                        style={{
                          borderBottom: `1px solid ${border}`,
                          animation: `d2dFadeUp 0.5s ease-out ${index * 0.05}s both`,
                        }}
                      >
                        <td style={{ padding: "1rem" }}>
                          <div className="flex items-center gap-3">
                            <div
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                background: user.profileIcon?.bgColor || slate,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#fff",
                                fontFamily: "'DM Sans', sans-serif",
                                fontWeight: 600,
                                fontSize: "0.9rem",
                              }}
                            >
                              {user.profileIcon?.initials ||
                                user.fullName?.charAt(0) ||
                                "?"}
                            </div>
                            <div>
                              <p
                                style={{
                                  fontFamily: "'DM Sans', sans-serif",
                                  fontWeight: 600,
                                  color: textPrimary,
                                }}
                              >
                                {user.fullName}
                              </p>
                              <p
                                style={{
                                  fontFamily: "'DM Sans', sans-serif",
                                  fontSize: "0.8rem",
                                  color: textSecondary,
                                }}
                              >
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "1rem" }}>
                          <span
                            style={{
                              padding: "0.25rem 0.75rem",
                              borderRadius: "12px",
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.75rem",
                              fontWeight: 500,
                              textTransform: "uppercase",
                              background:
                                user.role?.code === "admin"
                                  ? `${terracotta}30`
                                  : `${sage}30`,
                              color:
                                user.role?.code === "admin" ? terracotta : sage,
                            }}
                          >
                            {user.role?.name || "Member"}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: "1rem",
                            fontFamily: "'DM Sans', sans-serif",
                            color: textSecondary,
                          }}
                        >
                          {(user.owned?.teams?.length || 0) +
                            (user.member?.teams?.length || 0)}
                        </td>
                        <td
                          style={{
                            padding: "1rem",
                            fontFamily: "'DM Sans', sans-serif",
                            color: textSecondary,
                          }}
                        >
                          {(user.owned?.projects?.length || 0) +
                            (user.member?.projects?.length || 0)}
                        </td>
                        <td style={{ padding: "1rem", textAlign: "right" }}>
                          <button
                            onClick={() => setUserToDelete(user)}
                            style={{
                              padding: "0.5rem 1rem",
                              borderRadius: "6px",
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.8rem",
                              color: terracotta,
                              background: "transparent",
                              border: `1px solid ${terracotta}50`,
                              cursor: "pointer",
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Invited Users Table */}
        {activeTab === "invited" && (
          <div style={{ animation: "d2dFadeUp 0.7s ease-out 0.3s both" }}>
            <div
              style={{
                background: surface1,
                borderRadius: "20px",
                border: `1px solid ${border}`,
                overflow: "hidden",
              }}
            >
              {invitedUsers.length === 0 ? (
                <div className="p-8 text-center">
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: textSecondary,
                    }}
                  >
                    No invited users
                  </p>
                </div>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${border}` }}>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.75rem",
                          color: textTertiary,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          fontWeight: 600,
                        }}
                      >
                        Email
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.75rem",
                          color: textTertiary,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          fontWeight: 600,
                        }}
                      >
                        Invited On
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "right",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.75rem",
                          color: textTertiary,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          fontWeight: 600,
                        }}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invitedUsers.map((user, index) => (
                      <tr
                        key={user.id}
                        style={{
                          borderBottom: `1px solid ${border}`,
                          animation: `d2dFadeUp 0.5s ease-out ${index * 0.05}s both`,
                        }}
                      >
                        <td
                          style={{
                            padding: "1rem",
                            fontFamily: "'DM Sans', sans-serif",
                            color: textPrimary,
                          }}
                        >
                          {user.email}
                        </td>
                        <td
                          style={{
                            padding: "1rem",
                            fontFamily: "'DM Sans', sans-serif",
                            color: textSecondary,
                          }}
                        >
                          {new Date(user.invitedOn).toLocaleDateString()}
                        </td>
                        <td style={{ padding: "1rem", textAlign: "right" }}>
                          <button
                            onClick={() => setInvitedUserToDelete(user)}
                            style={{
                              padding: "0.5rem 1rem",
                              borderRadius: "6px",
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.8rem",
                              color: terracotta,
                              background: "transparent",
                              border: `1px solid ${terracotta}50`,
                              cursor: "pointer",
                            }}
                          >
                            Cancel Invite
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            animation: "d2dFadeUp 0.3s ease-out",
          }}
        >
          <div
            style={{
              background: surface1,
              borderRadius: "20px",
              border: `1px solid ${border}`,
              padding: "2rem",
              width: "100%",
              maxWidth: "500px",
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "1.5rem",
                  color: textPrimary,
                }}
              >
                Add New User
              </h2>
              <button
                onClick={() => setShowAddUserModal(false)}
                style={{ color: textTertiary, fontSize: "1.5rem" }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.75rem",
                    color: textTertiary,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    borderRadius: "10px",
                    background: surface3,
                    border: `1px solid ${formErrors.fullName ? terracotta : border}`,
                    color: textPrimary,
                    fontFamily: "'DM Sans', sans-serif",
                    marginTop: "0.25rem",
                  }}
                />
                {formErrors.fullName && (
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: terracotta,
                      marginTop: "0.25rem",
                    }}
                  >
                    {formErrors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.75rem",
                    color: textTertiary,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    borderRadius: "10px",
                    background: surface3,
                    border: `1px solid ${formErrors.email ? terracotta : border}`,
                    color: textPrimary,
                    fontFamily: "'DM Sans', sans-serif",
                    marginTop: "0.25rem",
                  }}
                />
                {formErrors.email && (
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: terracotta,
                      marginTop: "0.25rem",
                    }}
                  >
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.75rem",
                      color: textTertiary,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      borderRadius: "10px",
                      background: surface3,
                      border: `1px solid ${formErrors.username ? terracotta : border}`,
                      color: textPrimary,
                      fontFamily: "'DM Sans', sans-serif",
                      marginTop: "0.25rem",
                    }}
                  />
                  {formErrors.username && (
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: terracotta,
                        marginTop: "0.25rem",
                      }}
                    >
                      {formErrors.username}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.75rem",
                      color: textTertiary,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Initials
                  </label>
                  <input
                    type="text"
                    value={formData.initials}
                    onChange={(e) =>
                      setFormData({ ...formData, initials: e.target.value })
                    }
                    maxLength={3}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      borderRadius: "10px",
                      background: surface3,
                      border: `1px solid ${formErrors.initials ? terracotta : border}`,
                      color: textPrimary,
                      fontFamily: "'DM Sans', sans-serif",
                      marginTop: "0.25rem",
                    }}
                  />
                  {formErrors.initials && (
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: terracotta,
                        marginTop: "0.25rem",
                      }}
                    >
                      {formErrors.initials}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.75rem",
                    color: textTertiary,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    borderRadius: "10px",
                    background: surface3,
                    border: `1px solid ${formErrors.password ? terracotta : border}`,
                    color: textPrimary,
                    fontFamily: "'DM Sans', sans-serif",
                    marginTop: "0.25rem",
                  }}
                />
                {formErrors.password && (
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: terracotta,
                      marginTop: "0.25rem",
                    }}
                  >
                    {formErrors.password}
                  </p>
                )}
              </div>

              <div>
                <label
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.75rem",
                    color: textTertiary,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  Role
                </label>
                <select
                  value={formData.roleCode}
                  onChange={(e) =>
                    setFormData({ ...formData, roleCode: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    borderRadius: "10px",
                    background: surface3,
                    border: `1px solid ${border}`,
                    color: textPrimary,
                    fontFamily: "'DM Sans', sans-serif",
                    marginTop: "0.25rem",
                  }}
                >
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div
                className="flex gap-3 pt-4"
                style={{ borderTop: `1px solid ${border}` }}
              >
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    borderRadius: "8px",
                    background: "transparent",
                    border: `1px solid ${border}`,
                    color: textSecondary,
                    fontFamily: "'DM Sans', sans-serif",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creatingUser}
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    borderRadius: "8px",
                    background: terracotta,
                    border: "none",
                    color: surface0,
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    cursor: creatingUser ? "not-allowed" : "pointer",
                    opacity: creatingUser ? 0.7 : 1,
                  }}
                >
                  {creatingUser ? "Creating..." : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete User Confirmation */}
      {userToDelete && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            animation: "d2dFadeUp 0.3s ease-out",
          }}
        >
          <div
            style={{
              background: surface1,
              borderRadius: "20px",
              border: `1px solid ${border}`,
              padding: "2rem",
              width: "100%",
              maxWidth: "400px",
            }}
          >
            <h2
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "1.25rem",
                color: textPrimary,
                marginBottom: "1rem",
              }}
            >
              Delete User?
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: textSecondary,
                marginBottom: "1.5rem",
              }}
            >
              Are you sure you want to delete{" "}
              <strong style={{ color: textPrimary }}>
                {userToDelete.fullName}
              </strong>
              ? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setUserToDelete(null)}
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  borderRadius: "8px",
                  background: "transparent",
                  border: `1px solid ${border}`,
                  color: textSecondary,
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                disabled={deletingUser}
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  borderRadius: "8px",
                  background: terracotta,
                  border: "none",
                  color: surface0,
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  cursor: deletingUser ? "not-allowed" : "pointer",
                  opacity: deletingUser ? 0.7 : 1,
                }}
              >
                {deletingUser ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Invite Confirmation */}
      {invitedUserToDelete && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            animation: "d2dFadeUp 0.3s ease-out",
          }}
        >
          <div
            style={{
              background: surface1,
              borderRadius: "20px",
              border: `1px solid ${border}`,
              padding: "2rem",
              width: "100%",
              maxWidth: "400px",
            }}
          >
            <h2
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "1.25rem",
                color: textPrimary,
                marginBottom: "1rem",
              }}
            >
              Cancel Invitation?
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: textSecondary,
                marginBottom: "1.5rem",
              }}
            >
              Are you sure you want to cancel the invitation for{" "}
              <strong style={{ color: textPrimary }}>
                {invitedUserToDelete.email}
              </strong>
              ?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setInvitedUserToDelete(null)}
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  borderRadius: "8px",
                  background: "transparent",
                  border: `1px solid ${border}`,
                  color: textSecondary,
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteInvitedUser}
                disabled={deletingInvitedUser}
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  borderRadius: "8px",
                  background: terracotta,
                  border: "none",
                  color: surface0,
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  cursor: deletingInvitedUser ? "not-allowed" : "pointer",
                  opacity: deletingInvitedUser ? 0.7 : 1,
                }}
              >
                {deletingInvitedUser ? "Canceling..." : "Cancel Invite"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
