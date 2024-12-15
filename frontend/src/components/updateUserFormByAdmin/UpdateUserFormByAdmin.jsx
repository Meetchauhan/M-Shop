import { useFormik } from "formik";
import Input from "../../components/formComponent/inputField/Input";
import { ProfileValidation } from "../../validationSchema/ValidationSchema";
import SubmitButton from "../../components/formComponent/submitButton/SubmitButton";
import { useDispatch } from "react-redux";
import { closeUpdateUserByAdminModel } from "../../features/productModelSlice";
import FormHeading from "../formComponent/formHeading/FormHeading";
import PropTypes from "prop-types";

const UpdateUserFormByAdmin = ({ user, onSubmit }) => {
  const dispatch = useDispatch();

  const initialValue = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    password: user?.password || "",
  };
  const { handleChange, handleSubmit, values, touched, errors } = useFormik({
    enableReinitialize: true,
    initialValues: initialValue,
    validationSchema: ProfileValidation,
    onSubmit: async (value) => {
      console.log("updated user value---", value);
      onSubmit(value);
      await dispatch(closeUpdateUserByAdminModel()).unwrap();
    },
  });

  return (
    <div>
      <FormHeading heading={"Update Product"} />
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
        <SubmitButton type={"submit"} title={"Update Profile"} />
      </form>
    </div>
  );
};
export default UpdateUserFormByAdmin;

UpdateUserFormByAdmin.propTypes = {
  user: PropTypes.string,
  onSubmit: PropTypes.func,
};
