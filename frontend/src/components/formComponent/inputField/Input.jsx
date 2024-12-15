import PropTypes from "prop-types";
import "./input.scss";

const Input = ({
  type,
  name,
  handleChange,
  values,
  placeholder,
  touched,
  errors,
}) => {
  return (
    <div className="field">
      <input
        type={type}
        name={name}
        onChange={handleChange}
        value={values}
        placeholder={placeholder}
      />
      <p>{touched && errors}</p>
    </div>
  );
};
export default Input;

Input.propTypes = {
  type: PropTypes.any,
  name: PropTypes.string,
  handleChange: PropTypes.func,
  values: PropTypes.string,
  placeholder: PropTypes.string,
  touched: PropTypes.bool,
  errors: PropTypes.string,
};
