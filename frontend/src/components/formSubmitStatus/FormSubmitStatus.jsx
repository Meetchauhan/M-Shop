import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "./formSubmitStatus.scss";
import { useSelector } from "react-redux";

const FormSubmitStatus = ({ status, message }) => {
  const [showStatus, setShowStatus] = useState(true);
  const [transition, setTransition] = useState(false);
  const loginStatus = useSelector((state) => state?.auth?.data);
  console.log("login status", loginStatus);
  console.log("status", status);

  useEffect(() => {
    setTimeout(() => {
      setShowStatus(false);
    }, 50000);

    setTimeout(() => {
      setTransition(true);
    }, 500);

    setTimeout(() => {
      setTransition(false);
    }, 7000);
  }, [status]);

  return (
    showStatus && (
      <div className={`formSubmitStatus ${transition ? "show" : "hide"}`}>
        <p>{message}</p>
      </div>
    )
  );
};
export default FormSubmitStatus;

FormSubmitStatus.propTypes = {
  status: PropTypes.string,
  message: PropTypes.string,
};
