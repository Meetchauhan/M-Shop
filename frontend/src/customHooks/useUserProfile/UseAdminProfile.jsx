import { useSelector } from "react-redux";

const useAdminProfile = () => {
  const profile = useSelector((state) => state.admin?.profile);
  const storeProfile = JSON.parse(localStorage.getItem("adminProfile"));
  return profile?.data || storeProfile?.data;
};

export default useAdminProfile;
