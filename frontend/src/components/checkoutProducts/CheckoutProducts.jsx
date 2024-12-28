import PropTypes from "prop-types";
import "./checkoutProducts.scss";
import currency from "../../images/currency.svg";

const CheckoutProducts = ({ image, title, price, quantity }) => {
  return (
    <div className="checkoutProducts">
      <div className="checkoutProducts_wrap">
        <div className="left">
          <div className="image">
            <img src={image} alt={title} />
            <span>{quantity}</span>
          </div>
          <div className="title">{title}</div>
        </div>
        <div className="right">
          <img src={currency} alt="currency" />
          <div className="price"> {(price * quantity).toLocaleString("en-IN")}</div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutProducts;

CheckoutProducts.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
};
