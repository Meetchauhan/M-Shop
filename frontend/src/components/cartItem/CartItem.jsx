import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  fetchProduct,
  increaseProduct,
  reduceProduct,
  removeFromCart,
  totalAmount,
} from "../../features/cartSlice";
import "./cartItem.scss";
import deleteIcon from "../../images/delete.svg";
import currency from "../../images/currency.svg";

const CartItem = ({ productId, name, price, image, quantity }) => {
  const dispatch = useDispatch();
  const handleIncreaseProduct = () => {
    dispatch(increaseProduct({ productId, quantity })).then(() =>
      dispatch(fetchProduct()).then(() => dispatch(totalAmount()))
    );
  };

  const handleReduceProductFromCart = () => {
    dispatch(reduceProduct({ productId, quantity })).then(() =>
      dispatch(fetchProduct()).then(() => dispatch(totalAmount()))
    );
  };
  const handleRemoveProductFromCart = () => {
    dispatch(removeFromCart({ productId })).then(() =>
      dispatch(fetchProduct()).then(() => dispatch(totalAmount()))
    );
  };

  return (
    <div className="cartItem">
      <div className="container">
        <div className="cartItem_wrapper">
          <div className="image">
            <img src={image} alt={name} />
          </div>
          <h4 className="h4">{name}</h4>
          <div className="price">
            <img src={currency} alt="currency" />
            {price.toLocaleString("en-IN")}
          </div>
          <div className="quantity_wrap">
            <div
              className="quantityCount decrease"
              onClick={handleReduceProductFromCart}
            >
              -
            </div>
            <div className="quantity">{quantity}</div>
            <div
              className="quantityCount increase"
              onClick={handleIncreaseProduct}
            >
              +
            </div>
          </div>
          <div className="deleteProduct" onClick={handleRemoveProductFromCart}>
            <img src={deleteIcon} alt="deleteIcon" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartItem;

CartItem.propTypes = {
  productId: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
};
