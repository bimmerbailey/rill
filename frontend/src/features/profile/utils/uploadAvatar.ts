import axios from "axios";

const MAX_FILE_SIZE = 800 * 1024; // 800KB in bytes
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
];

export class AvatarUploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AvatarUploadError";
  }
}

export async function uploadAvatar(file: File): Promise<void> {
  // Validate file type
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    throw new AvatarUploadError(
      "Invalid file type. Only JPG, PNG, and GIF files are allowed.",
    );
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new AvatarUploadError(
      `File size exceeds the maximum allowed size of 800KB. Your file is ${Math.round(file.size / 1024)}KB.`,
    );
  }

  // Create form data
  const formData = new FormData();
  formData.append("file", file);

  try {
    // Upload to REST endpoint
    await axios.post("/users/me/avatar", formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new AvatarUploadError(
        error.response?.data?.message ||
          "Failed to upload avatar. Please try again.",
      );
    }
    throw new AvatarUploadError("An unexpected error occurred during upload.");
  }
}
