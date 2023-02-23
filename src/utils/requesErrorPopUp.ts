import { toast } from "react-toastify";

export type ErrorType = {
  status: number;
  data: {
    code: number;
    message: string;
  };
}

export const requestErrorPopUp = (e: ErrorType): void => {
  console.log(e)
  if (e?.status === 498) {
    window.location.reload();
    return;
  }

  toast.error(e?.data?.message);
}