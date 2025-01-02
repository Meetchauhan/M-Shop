import { useFormik } from "formik";
import FormHeading from "../../components/formComponent/formHeading/FormHeading";
import Input from "../../components/formComponent/inputField/Input";
import { LoginValidation } from "../../validationSchema/ValidationSchema";
import SubmitButton from "../../components/formComponent/submitButton/SubmitButton";
import "./login.scss";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, loginUser } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import FormSubmitStatus from "../../components/formSubmitStatus/FormSubmitStatus";
import { fetchProduct } from "../../features/cartSlice";
import PageTransition from "../../components/pageTransition/PageTransition";
import { useState } from "react";

const Login = () => {
  const [formStatus, setFormStatus] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state?.auth?.data);
  const initialValue = {
    email: "",
    password: "",
  };
  console.log("loginData2", loginData);

  const { handleChange, handleSubmit, touched, errors, values } = useFormik({
    initialValues: initialValue,
    validationSchema: LoginValidation,
    onSubmit: async (value, action) => {
      console.log("login value", value);
      const result = await dispatch(loginUser(value)).unwrap();
      console.log("result login", result);
      if (result.status) {
        navigate("/", { replace: true });
      }
      const profileResult = await dispatch(getProfile()).unwrap();
      console.log("result profile", profileResult);
      dispatch(fetchProduct()).unwrap();
      await result.status;
      if (result.status === false) {
        setFormStatus(true);
      }
      setTimeout(() => {
        setFormStatus(false);
      }, 5000);
      action.resetForm();
    },
  });
  return (
    <>
      <div className="form login register">
        <div className="container">
          <div className="form_wrapper">
            <FormHeading heading={"Login"} />
            <form onSubmit={handleSubmit}>
              <Input
                type={"email"}
                name={"email"}
                placeholder={"Email"}
                handleChange={handleChange}
                values={values.email}
                touched={touched.email}
                errors={errors.email}
              />
              <Input
                type={"password"}
                name={"password"}
                placeholder={"Password"}
                handleChange={handleChange}
                values={values.password}
                touched={touched.password}
                errors={errors.password}
              />
              <SubmitButton type={"submit"} title={"Login"} />
            </form>
            <div className="register_link">
              Don&apos;t have an account, please{" "}
              <PageTransition to={"/register"}>Register</PageTransition>
            </div>
          </div>
        </div>
      </div>
      {formStatus && (
        <FormSubmitStatus status={formStatus} message={loginData?.message} />
      )}
    </>
  );
};
export default Login;
