import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const PageTransition = ({ profile, children, to, ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const sleep = () => {
    return new Promise((resolve) => setTimeout(resolve, 300));
  };

  const handleTransition = async (e) => {
    e.preventDefault();
    profile && profile();
    if (to === location.pathname) {
      return;
    }
    const transition = document.querySelector("body");
    transition?.classList.add("page_transition");
    await sleep(300);
    navigate(to);
    await sleep(300);
    transition?.classList.remove("page_transition");
  };

  return (
    <Link {...props} to={to} onClick={handleTransition}>
      {children}
    </Link>
  );
};

export default PageTransition;

PageTransition.propTypes = {
  profile: PropTypes.func,
  children: PropTypes.any,
  to: PropTypes.string,
};
