import { useDispatch } from "react-redux";
import { openAddProductModel } from "../../features/productModelSlice";
import "./buttons.scss";

const AddProductBtn = () => {
  const dispatch = useDispatch();
  return (
    <div className="addProductBtn">
      <button onClick={() => dispatch(openAddProductModel())}>
        Add Product
      </button>
    </div>
  );
};
export default AddProductBtn;
