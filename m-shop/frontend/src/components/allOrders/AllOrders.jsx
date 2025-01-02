import PropTypes from "prop-types";
import "./allOrders.scss";
import currency from "../../images/currency.svg";

const AllOrders = ({ orders }) => {
  console.log("order component", orders);

  return (
    <div className="allOrders">
      {orders?.cart?.map((item, index) => (
        <div className="allOrders_inner" key={index}>
          <div className="allOrders_wrap">
            <div className="allOrders_wrap_left">
              <div className="allOrders_wrap_left_image">
                <img src={item?.image} alt={item?.name} />
              </div>
              <div className="allOrders_wrap_left_title">{item?.name}</div>
            </div>
            <div className="allOrders_wrap_right">
              <div className="allOrders_wrap_right_quantity">
                Quantity : {item?.quantity}
              </div>
              <div className="allOrders_wrap_right_price">
                Amount :{" "}
                <span>
                  <img src={currency} alt="currency" />{" "}
                  {item?.price?.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="allOrders_bottom">
        <div className="allOrders_bottom_orderStatus">
          Order Status : <span>{orders?.status}</span>
        </div>
        <div className="allOrders_bottom_totalAmount">
          Total Amount :{" "}
          <span>
            <img src={currency} alt="currency" />
            {orders?.totalAmount?.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </div>
  );
};
export default AllOrders;

AllOrders.propTypes = {
  orders: PropTypes.object,
};
