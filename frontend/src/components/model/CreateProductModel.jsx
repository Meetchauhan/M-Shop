import { useDispatch } from "react-redux";
import { closeAddProductModel } from "../../features/productModelSlice";
import "./model.scss";
import CreateProductForm from "../createProductForm/CreateProductForm";

const CreateProductModel = () => {
  const dispatch = useDispatch();
  return (
    <div className="form login register admin_product_form">
      <div className="container">
        <div className="form_wrapper">
          <div
            className="closeModel"
            onClick={() => dispatch(closeAddProductModel())}
          >
            Close
          </div>
          <CreateProductForm />
        </div>
      </div>
    </div>
  );
};
export default CreateProductModel;
