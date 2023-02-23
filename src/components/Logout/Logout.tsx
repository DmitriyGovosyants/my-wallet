import { FC } from "react";
import { useLogoutMutation } from "redux/authApi";

const Logout: FC = () => {
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async (): Promise<void> => {
    try {
      await logout({}).unwrap();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button onClick={handleLogout}>LOGOUT</button>
  )
};

export default Logout;