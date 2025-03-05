import { useDispatch, useSelector } from "react-redux";
import useUserProfile from "../../customHooks/useUserProfile/UseUserProfile";
import "./profile.scss";
import { openUserEditModel } from "../../features/productModelSlice";
import UpdateProfileModel from "../../components/model/UpdateProfileModel";
import EditUserBtn from "../../components/buttons/editUserBtn/EditUserBtn";
import Heading from "../../components/heading/Heading";
import { useEffect } from "react";

const Profile = () => {
  const dispatch = useDispatch();
  const profile = useUserProfile();
  const handleModel = useSelector(
    (state) => state?.handleProductModel.editUser
  );
  useEffect(() => {
    document.title = "Profile";
  }, []);
  
  return (
    <div className="profile">
      <div className="container">
        <Heading title={"Profile"} />
        <div className="profile_table">
          <table>
            <thead>
              <th>{`${profile?.firstName}'s Profile`}</th>
            </thead>
            <tbody>
              <tr>
                <th>First Name </th>
                <td>{profile?.firstName}</td>
              </tr>
              <tr>
                <th>Last Name </th>
                <td>{profile?.lastName}</td>
              </tr>
              <tr>
                <th>Email </th>
                <td>{profile?.email}</td>
              </tr>
              <tr>
                <th>Password </th>
                <td>{profile?.password}</td>
              </tr>
            </tbody>
          </table>
          <EditUserBtn
            primaryText={"Edit User"}
            alternateText={"Edit User"}
            onClick={() => dispatch(openUserEditModel())}
          />
          {handleModel && <UpdateProfileModel />}
        </div>
      </div>
    </div>
  );
};
export default Profile;
