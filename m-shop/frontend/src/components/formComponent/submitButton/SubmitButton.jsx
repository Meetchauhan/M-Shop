import PropTypes from "prop-types";
import "./submitButton.scss"

const SubmitButton = ({ type, title }) => {
  return (
    <div className="submitBtn">
      <button type={type}>{title}</button>
    </div>
  );
};
export default SubmitButton;

SubmitButton.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
};
