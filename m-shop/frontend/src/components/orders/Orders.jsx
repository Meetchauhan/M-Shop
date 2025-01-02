import PropTypes from "prop-types";
import "./orders.scss";
import currency from "../../images/currency.svg";

const Orders = ({ image, title, quantity, amount }) => {
  return (
    <div className="orders">
      <div className="orders_wrap">
        <div className="orders_wrap_left">
          <div className="orders_wrap_left_image">
            <img src={image} alt={title} />
          </div>
          <div className="orders_wrap_left_title">{title}</div>
        </div>
        <div className="orders_wrap_right">
          <div className="orders_wrap_right_quantity">
            Quantity : {quantity}
          </div>
          <div className="orders_wrap_right_price">
            Amount : <img src={currency} alt="currency" />
            {(amount * quantity)?.toLocaleString("en-IN")}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Orders;

Orders.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  quantity: PropTypes.number,
  amount: PropTypes.number,
};
