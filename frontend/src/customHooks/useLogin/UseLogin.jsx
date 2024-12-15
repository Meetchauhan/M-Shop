import { useSelector } from "react-redux";

const useLogin = () => {
  const login = useSelector((login) => login?.auth?.data);
  const storedLogin = JSON.parse(localStorage.getItem("userInfo"));
  return login?.status || storedLogin?.status;
};
export default useLogin;
