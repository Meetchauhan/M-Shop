
import { useDispatch } from "react-redux";
import FormHeading from "../../components/formComponent/formHeading/FormHeading";

// import "./profile.scss";
import EditUser from "../editUser/EditUser";
import { closeUserEditModel } from "../../features/productModelSlice";

const UpdateProfileModel = () => {
    const dispatch = useDispatch()
  return (
    <div className="form login register admin_product_form">
      {/* <div className="container"> */}
        <div className="form_wrapper">
        <div
            className="closeModel"
            onClick={() => dispatch(closeUserEditModel())}
          >
            Close
          </div>
          <FormHeading heading={"Update Profile"} />
          <EditUser />
        </div>
      {/* </div> */}
    </div>
  );
};
export default UpdateProfileModel;
