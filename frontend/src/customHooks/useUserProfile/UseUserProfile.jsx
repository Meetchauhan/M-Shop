import { useSelector } from "react-redux";

const useUserProfile = () => {
  const profile = useSelector((state) => state?.auth?.profile?.data);

  return profile;
};

export default useUserProfile;
