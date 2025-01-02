import PropTypes from "prop-types";
import "./orderInfo.scss";

const OrderInfo = ({
  firstName,
  lastName,
  email,
  address,
  phone,
  city,
  state,
  pincode,
}) => {
  return (
    <div className="orderInfo">
      <h2>Shipping Address</h2>
      <div className="orderInfo_wrap">
        <ul>
          <li>
            <span>Name :</span> {`${firstName} ${lastName}`}
          </li>
          <li>
            <span>Email :</span> {email}
          </li>
          <li>
            <span>Address :</span> {address}
          </li>
          <li>
            <span>Phone:</span> {phone}
          </li>
          <li>
            <span>City :</span> {city}
          </li>
          <li>
            <span>State :</span> {state}
          </li>
          <li>
            <span>Pincode :</span> {pincode}
          </li>
        </ul>
      </div>
    </div>
  );
};
export default OrderInfo;

OrderInfo.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  address: PropTypes.string,
  phone: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  pincode: PropTypes.string,
};
