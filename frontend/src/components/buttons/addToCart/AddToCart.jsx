import PropTypes from "prop-types";
import "./addToCart.scss"

const AddToCartBtn = ({ title, onClick }) => {
  return (
    <button className="button-48" role="button" onClick={onClick}>
      <span className="text">{title}</span>
    </button>
  );
};
export default AddToCartBtn;

AddToCartBtn.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};
