import PropTypes from "prop-types";
import "./contactBtn.scss";
const ContactBtn = ({ primaryText, alternateText, onClick }) => {
  return (
    <button className="contactBtn" role="button" onClick={onClick} >
      <span className="">{primaryText}</span>
      <span>{alternateText}</span>
    </button>
  );
};
export default ContactBtn;

ContactBtn.propTypes = {
  primaryText: PropTypes.string,
  alternateText: PropTypes.string,
  onClick: PropTypes.func,
};
