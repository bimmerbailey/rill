import { useState } from "react";
import { AvatarUpload } from "./AvatarUpload";
import { UserInfoForm } from "./UserInfoForm";
import { PasswordForm } from "./PasswordForm";
import { useProfile } from "../hooks/useProfile";

type TabId = "general" | "password" | "info" | "notifications";

interface Tab {
  id: TabId;
  label: string;
  enabled: boolean;
}

const tabs: Tab[] = [
  { id: "general", label: "General", enabled: true },
  { id: "password", label: "Password", enabled: true },
  { id: "info", label: "Info", enabled: false },
  { id: "notifications", label: "Notifications", enabled: false },
];

export function ProfileSettings() {
  const [activeTab, setActiveTab] = useState<TabId>("general");

  const {
    user,
    loading,
    isUploadingAvatar,
    isUpdatingInfo,
    isUpdatingPassword,
    isClearingAvatar,
    handleUploadAvatar,
    handleClearAvatar,
    handleUpdateInfo,
    handleUpdatePassword,
  } = useProfile();

  // Dark palette — warm charcoal tones
  const surface1 = "#231f1c";
  const border = "rgba(255,235,210,0.06)";
  const textPrimary = "rgba(245,238,230,0.87)";
  const textSecondary = "rgba(245,238,230,0.5)";
  const textTertiary = "rgba(245,238,230,0.32)";
  const terracotta = "#c9805e";

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div
          className="w-12 h-12 border-4 rounded-full animate-spin"
          style={{
            borderColor: textTertiary,
            borderTopColor: terracotta,
          }}
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: textSecondary,
          }}
        >
          User data not available
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Tab Navigation */}
      <div
        className="mb-8"
        style={{
          borderBottom: `1px solid ${border}`,
        }}
      >
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => tab.enabled && setActiveTab(tab.id)}
              disabled={!tab.enabled}
              className="py-4 px-1 border-b-2 text-xs uppercase tracking-widest transition-all duration-300"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                borderColor: activeTab === tab.id ? terracotta : "transparent",
                color: activeTab === tab.id ? terracotta : textSecondary,
                opacity: tab.enabled ? 1 : 0.4,
                cursor: tab.enabled ? "pointer" : "not-allowed",
              }}
            >
              {tab.label}
              {!tab.enabled && (
                <span
                  className="ml-2"
                  style={{
                    color: textTertiary,
                    fontSize: "0.65rem",
                  }}
                >
                  (Coming Soon)
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div
        className="rounded-3xl p-10"
        style={{
          background: surface1,
          border: `1px solid ${border}`,
        }}
      >
        {activeTab === "general" && (
          <div className="space-y-12">
            <div>
              <h2
                className="text-2xl mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  color: textPrimary,
                }}
              >
                Profile <span className="italic">Picture</span>
              </h2>
              <AvatarUpload
                profileIcon={user.profileIcon}
                fullName={user.fullName}
                onUpload={handleUploadAvatar}
                onRemove={handleClearAvatar}
                isUploading={isUploadingAvatar}
                isRemoving={isClearingAvatar}
              />
            </div>

            <div className="pt-12" style={{ borderTop: `1px solid ${border}` }}>
              <h2
                className="text-2xl mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  color: textPrimary,
                }}
              >
                User <span className="italic">Information</span>
              </h2>
              <UserInfoForm
                user={user}
                onSubmit={handleUpdateInfo}
                isSubmitting={isUpdatingInfo}
              />
            </div>
          </div>
        )}

        {activeTab === "password" && (
          <div>
            <h2
              className="text-2xl mb-8"
              style={{
                fontFamily: "'Libre Baskerville', serif",
                color: textPrimary,
              }}
            >
              Change <span className="italic">Password</span>
            </h2>
            <PasswordForm
              onSubmit={handleUpdatePassword}
              isSubmitting={isUpdatingPassword}
            />
          </div>
        )}

        {activeTab === "info" && (
          <div className="text-center py-12">
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: textSecondary,
              }}
            >
              Additional information tab coming soon...
            </p>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="text-center py-12">
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: textSecondary,
              }}
            >
              Notification preferences coming soon...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
