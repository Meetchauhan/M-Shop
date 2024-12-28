import Cartline from "../../components/cartline/Cartline";
import ShippingAddress from "../../components/shippingAddress/ShippingAddress";
import "./checkout.scss";

const Checkout = () => {
  return (
    <div className="checkout">
      <div className="checkout_wrap">
        <ShippingAddress />
        <div className="checkout_wrap_cartline">
          <Cartline />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
