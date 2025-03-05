import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../../components/cartItem/CartItem";
import { useEffect } from "react";
import { totalAmount } from "../../features/cartSlice";
import "./cart.scss";
import currency from "../../images/currency.svg";
import PageTransition from "../../components/pageTransition/PageTransition";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import emptyCart from "../../images/empty-cart.webp";

const Cart = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((cart) => cart?.cart?.cart?.data);
  const total = useSelector((total) =>
    total?.cart?.total?.totalAmount?.toLocaleString("en-IN")
  );
  console.log("total", cartProducts);
  const cartTotalLoading = useSelector((item) => item?.cart?.loading);

  useEffect(() => {
    dispatch(totalAmount());
  }, [dispatch]);

  useEffect(() => {
    document.title = "Cart";
  }, []);

  return (
    <div className="cart">
      <div className="container">
        {cartProducts?.length > 0 && (
          <div className="cart_wrap">
            <div className="title">Your Cart</div>
            <div className="continue_shopping">
              <PageTransition to="/">Continue Shopping</PageTransition>
            </div>
          </div>
        )}

        {cartProducts?.length > 0 && (
          <div className="cart_wrapper">
            {cartProducts?.map((item) => (
              <CartItem key={item._id} {...item} />
            ))}
          </div>
        )}
        {cartProducts?.length > 0 && (
          <div className="checkout_box">
            {!cartTotalLoading ? (
              <div className="totalAmount">
                Total Amount : <img src={currency} alt="currency" /> {total}
              </div>
            ) : (
              <div className="totalAmountLoader">
                <SkeletonTheme baseColor="#e0e0e0" highlightColor="#4d4e51fa">
                  <Skeleton width={200} height={50} duration={0.8} />
                </SkeletonTheme>
              </div>
            )}
            {!cartTotalLoading ? (
              <div className="proccess_to_checkout">
                <PageTransition to="/checkout">
                  Proceed to Checkout
                </PageTransition>
              </div>
            ) : (
              <div className="proccess_to_checkout">
                <SkeletonTheme baseColor="#e0e0e0" highlightColor="#4d4e51fa">
                  <Skeleton width={200} height={50} duration={0.8} />
                </SkeletonTheme>
              </div>
            )}
          </div>
        )}
        {(cartProducts?.length < 1 || cartProducts === undefined) && (
          <div className="emptyCart">
            <div className="emptyCart_image">
              <img src={emptyCart} alt="empty-cart" />
            </div>
            There is no product in cart to add product in cart please click{" "}
            <Link to={"/"}>here</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
