import PropTypes from "prop-types";
import "./formHeading.scss"

const FormHeading = ({ heading }) => {
  return (
    <div className="form_heading">
      <h3>{heading}</h3>
    </div>
  );
};
export default FormHeading;

FormHeading.propTypes = {
  heading: PropTypes.string,
};
