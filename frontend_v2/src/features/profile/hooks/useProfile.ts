import { useState } from "react";
import {
  useGetMyProfileQuery,
  useUpdateUserInfoMutation,
  useUpdateUserPasswordMutation,
  useClearProfileAvatarMutation,
} from "@/graphql/generated/graphql";
import { uploadAvatar, AvatarUploadError } from "../utils/uploadAvatar";
import { showSuccess, showError } from "@/utils/toast";
import type { UserInfoFormData } from "../utils/validation";

export function useProfile() {
  const { data, loading, error, refetch } = useGetMyProfileQuery();
  const [updateUserInfoMutation] = useUpdateUserInfoMutation();
  const [updatePasswordMutation] = useUpdateUserPasswordMutation();
  const [clearAvatarMutation] = useClearProfileAvatarMutation();

  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isUpdatingInfo, setIsUpdatingInfo] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isClearingAvatar, setIsClearingAvatar] = useState(false);

  const user = data?.me?.user;

  const handleUploadAvatar = async (file: File) => {
    setIsUploadingAvatar(true);
    try {
      await uploadAvatar(file);
      await refetch(); // Refresh user data to get new avatar URL
      showSuccess("Avatar uploaded successfully");
    } catch (err) {
      if (err instanceof AvatarUploadError) {
        showError(err.message);
      } else {
        showError("Failed to upload avatar. Please try again.");
      }
      throw err;
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleClearAvatar = async () => {
    setIsClearingAvatar(true);
    try {
      await clearAvatarMutation();
      showSuccess("Avatar removed successfully");
    } catch (err) {
      showError("Failed to remove avatar. Please try again.");
      throw err;
    } finally {
      setIsClearingAvatar(false);
    }
  };

  const handleUpdateInfo = async (formData: UserInfoFormData) => {
    if (!user) {
      showError("User not found");
      return;
    }

    setIsUpdatingInfo(true);
    try {
      await updateUserInfoMutation({
        variables: {
          name: formData.name,
          initials: formData.initials,
          email: formData.email,
          bio: formData.bio || "",
        },
      });
      await refetch(); // Refresh to get updated data
      showSuccess("Profile updated successfully");
    } catch (err) {
      showError("Failed to update profile. Please try again.");
      throw err;
    } finally {
      setIsUpdatingInfo(false);
    }
  };

  const handleUpdatePassword = async (password: string) => {
    if (!user) {
      showError("User not found");
      return;
    }

    setIsUpdatingPassword(true);
    try {
      await updatePasswordMutation({
        variables: {
          userID: user.id,
          password,
        },
      });
      showSuccess("Password updated successfully");
    } catch (err) {
      showError("Failed to update password. Please try again.");
      throw err;
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return {
    user,
    loading,
    error,
    isUploadingAvatar,
    isUpdatingInfo,
    isUpdatingPassword,
    isClearingAvatar,
    handleUploadAvatar,
    handleClearAvatar,
    handleUpdateInfo,
    handleUpdatePassword,
  };
}
