import PropTypes from "prop-types";
import "./select.scss"

const Select = ({ onChange, value, name, defaultValue }) => {
  return (
    <select
      name={name}
      onChange={onChange}
      defaultValue={"Select Category"}
      value={value}
      className="categorySelect"
    >
      <option value="" disabled>
        {defaultValue}
      </option>
      <option value="Shoes">Shoes</option>
      <option value="Chair">Chair</option>
      <option value="Camera">Camera</option>
      <option value="Watch">Watch</option>
      <option value="Cosmetic">Cosmetic</option>
      <option value="Bag">Bag</option>
      <option value="Headphone">Headphone</option>
    </select>
  );
};
export default Select;

Select.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string,
  defaultValue: PropTypes.string,
};
