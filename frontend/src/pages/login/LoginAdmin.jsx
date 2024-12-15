import { useFormik } from "formik";
import FormHeading from "../../components/formComponent/formHeading/FormHeading";
import Input from "../../components/formComponent/inputField/Input";
import { LoginValidation } from "../../validationSchema/ValidationSchema";
import SubmitButton from "../../components/formComponent/submitButton/SubmitButton";
import "./login.scss";
import { useDispatch, useSelector } from "react-redux";
// import { getProfile, loginUser } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { getAdminProfile, loginAdmin } from "../../features/adminSlice";

const LoginAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state);
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
      const result = await dispatch(loginAdmin(value)).unwrap();
      console.log("result login", result);
      if (result.status) {
        navigate("/dashboard", { replace: true });
      }
      const profileResult = await dispatch(getAdminProfile()).unwrap();
        console.log("result profile", profileResult);
      action.resetForm();
    },
  });
  return (
    <div className="form login register">
      <div className="container">
        <div className="form_wrapper">
          <FormHeading heading={"Admin Login"} />
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
        </div>
      </div>
    </div>
  );
};
export default LoginAdmin;
