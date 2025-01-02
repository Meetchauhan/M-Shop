import { useDispatch } from "react-redux";
import { closeUpdateProductModel } from "../../features/productModelSlice";
import "./model.scss";
import UpdateProductForm from "../updateProductForm/UpdateProductForm";
import PropTypes from "prop-types";

const UpdateProductModel = ({ product, onSubmit }) => {
  const dispatch = useDispatch();
  return (
    <div className="form login register admin_product_form">
      <div className="container">
        <div className="form_wrapper">
          <div
            className="closeModel"
            onClick={() => dispatch(closeUpdateProductModel())}
          >
            Close
          </div>
          <UpdateProductForm product={product} onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};
export default UpdateProductModel;

UpdateProductModel.propTypes = {
  product: PropTypes.string,
  onSubmit: PropTypes.func,
};
