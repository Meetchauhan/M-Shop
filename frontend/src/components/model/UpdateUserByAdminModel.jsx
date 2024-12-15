import { useDispatch } from "react-redux";
import {  closeUpdateUserByAdminModel } from "../../features/productModelSlice";
import "./model.scss";
import PropTypes from "prop-types";
import UpdateUserFormByAdmin from "../updateUserFormByAdmin/UpdateUserFormByAdmin";

const UpdateUserByAdminModel = ({ user, onSubmit }) => {
  const dispatch = useDispatch();
  return (
    <div className="form login register admin_product_form">
      <div className="container">
        <div className="form_wrapper">
          <div
            className="closeModel"
            onClick={() => dispatch(closeUpdateUserByAdminModel())}
          >
            Close
          </div>
          <UpdateUserFormByAdmin user={user} onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};
export default UpdateUserByAdminModel;

UpdateUserByAdminModel.propTypes = {
  user: PropTypes.object,
  onSubmit: PropTypes.func,
};
