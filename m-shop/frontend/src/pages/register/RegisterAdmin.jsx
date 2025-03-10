import { useFormik } from "formik";
import Input from "../../components/formComponent/inputField/Input";
import { RegisterValidation } from "../../validationSchema/ValidationSchema";
import SubmitButton from "../../components/formComponent/submitButton/SubmitButton";
import FormHeading from "../../components/formComponent/formHeading/FormHeading";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerAdmin } from "../../features/adminSlice";
import { useEffect } from "react";

const RegisterAdmin = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValue = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const { handleChange, handleSubmit, values, touched, errors } = useFormik({
    initialValues: initialValue,
    validationSchema: RegisterValidation,
    onSubmit: async (value, action) => {
      console.log("register value", value);
      const result = await dispatch(registerAdmin(value)).unwrap();
      if (result.status) {
        navigate("/login", { replace: true });
      }
      action.resetForm();
    },
  });
  useEffect(() => {
    document.title = "Register";
  }, []);
  return (
    <div className="form login register">
      <div className="container">
        <div className="form_wrapper">
          <FormHeading heading={"Admin Register"} />
          <form onSubmit={handleSubmit}>
            <Input
              type={"text"}
              name={"firstName"}
              placeholder={"First Name"}
              handleChange={handleChange}
              values={values.firstName}
              touched={touched.firstName}
              errors={errors.firstName}
            />
            <Input
              type={"text"}
              name={"lastName"}
              placeholder={"Last Name"}
              handleChange={handleChange}
              values={values.lastName}
              touched={touched.lastName}
              errors={errors.lastName}
            />
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
            <SubmitButton type={"submit"} title={"Register"} />
          </form>
        </div>
      </div>
    </div>
  );
};
export default RegisterAdmin;
