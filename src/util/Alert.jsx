import { toast } from "react-toastify";

// react toast success message
export const addSuccessfully = (addedMessage) => {
  toast.success(addedMessage, {});
};

// react toast err message
export const toastError = (errorMessage) => {
  toast.error(errorMessage, {});
};
