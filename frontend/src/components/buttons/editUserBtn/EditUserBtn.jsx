import PropTypes from "prop-types";
import "./editUserBtn.scss"
const EditUserBtn = ({ primaryText, alternateText, onClick }) => {
  return (
    <button className="editUser" role="button" onClick={onClick}>
      <span className="text">{primaryText}</span>
      <span>{alternateText}</span>
    </button>
  );
};
export default EditUserBtn;

EditUserBtn.propTypes = {
  primaryText: PropTypes.string,
  alternateText: PropTypes.string,
  onClick: PropTypes.func,
};
