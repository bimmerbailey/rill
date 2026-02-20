import { toast } from "react-toastify";

// Thin wrappers so call sites don't need to import react-toastify directly.
// Options (position, autoClose, etc.) are set on <ToastContainer> in providers/index.tsx.

export const showSuccess = (message: string) => toast.success(message);
export const showError = (message: string) => toast.error(message);
export const showInfo = (message: string) => toast.info(message);
export const showWarning = (message: string) => toast.warning(message);
