import { toast } from "react-toastify";

export interface IErrorAPI {
  status: number;
  data: {
    code: number;
    message: string;
  };
}

export const requestErrorPopUp = (e: IErrorAPI): void => {
  console.log(e)
  if (e?.status === 498) {
    window.location.reload();
    return;
  }

  toast.error(e?.data?.message);
}