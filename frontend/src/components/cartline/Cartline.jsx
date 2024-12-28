import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct, totalAmount } from "../../features/cartSlice";
import CheckoutProducts from "../checkoutProducts/CheckoutProducts";
import "./cartline.scss";
import currency from "../../images/currency.svg"

const Cartline = () => {
  const dispatch = useDispatch();
  const products = useSelector((cartline) => cartline?.cart?.cart?.data);
  const finalAmount = useSelector(
    (cartline) => cartline?.cart?.total?.totalAmount?.toLocaleString("en-IN")
  );
  console.log("cartline products", products);

  useEffect(() => {
    dispatch(fetchProduct());
    dispatch(totalAmount());
  }, [dispatch]);
  return (
    <div className="cartline">
      <div className="cartline_wrapper">
      <h2>Order Summary</h2>
        {products?.map((item) => (
          <CheckoutProducts
            key={item?.productId}
            image={item.image}
            title={item?.name}
            price={item?.price}
            quantity={item?.quantity}
          />
        ))}
        <ul>
          <li>
            Subtotal <span><img src={currency} alt="currancy" /> {finalAmount}</span>
          </li>
          <li>
            Shipping <span>Free</span>
          </li>
        </ul>
        <h4>
          Total <span><img src={currency} alt="currancy" /> {finalAmount}</span>
        </h4>
      </div>
    </div>
  );
};
export default Cartline;
