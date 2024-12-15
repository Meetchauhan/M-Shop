import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "./formSubmitStatus.scss";
import { useSelector } from "react-redux";

const FormSubmitStatus = () => {
  const [showStatus, setShowStatus] = useState(true);
  const [transition, setTransition] = useState(false);
  const loginStatus = useSelector((state)=>state?.auth?.data)
  console.log("login status", loginStatus);
  

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
  }, [loginStatus, showStatus]);

  return (
    showStatus && (
      <div className={`formSubmitStatus ${transition ? "show" : "hide"}`}>
        <p>{loginStatus?.message}</p>
      </div>
    )
  );
};
export default FormSubmitStatus;

FormSubmitStatus.propTypes = {
  status: PropTypes.string,
};
