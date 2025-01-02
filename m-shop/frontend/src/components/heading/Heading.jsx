import PropTypes from "prop-types";
import "./heading.scss";
const Heading = ({ title }) => {
  return title && <h2>{title}</h2>;
};
export default Heading;
Heading.propTypes = {
  title: PropTypes.string,
};
