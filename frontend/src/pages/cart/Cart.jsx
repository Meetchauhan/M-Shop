import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../../components/cartItem/CartItem";
import { useEffect } from "react";
import { totalAmount } from "../../features/cartSlice";
import "./cart.scss";
import currency from "../../images/currency.svg";

const Cart = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((cart) => cart?.cart?.cart?.data);
  const total = useSelector((total) => total?.cart?.total?.totalAmount);
  console.log("total", cartProducts);

  useEffect(() => {
    dispatch(totalAmount());
  }, [dispatch]);

  return (
    <div className="cart">
      {cartProducts?.length > 0 && (
        <div className="cart_wrapper">
          {cartProducts?.map((item) => (
            <CartItem key={item._id} {...item} />
          ))}
        </div>
      )}
      {cartProducts?.length > 0 && (
        <div className="totalAmount">
          Total Amount : <img src={currency} alt="currency" /> {total}
        </div>
      )}
      {(cartProducts?.length < 1 || cartProducts === undefined) && (
        <div>
          There is no product in cart please add product{" "}
          <Link to={"/"}>home</Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
