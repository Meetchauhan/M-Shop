import { useFormik } from "formik";
import Input from "../../components/formComponent/inputField/Input";
import { ProfileValidation } from "../../validationSchema/ValidationSchema";
import SubmitButton from "../../components/formComponent/submitButton/SubmitButton";
import { useDispatch } from "react-redux";
import { getProfile, updateProfile } from "../../features/authSlice";
import useUserProfile from "../../customHooks/useUserProfile/UseUserProfile";
import { closeUserEditModel } from "../../features/productModelSlice";
import { updateUserByAdmin } from "../../features/userSlice";
// import "./profile.scss";

const EditUser = () => {
  const dispatch = useDispatch();
  const profile = useUserProfile();

  const initialValue = {
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || "",
    email: profile?.email || "",
    password: profile?.password || "",
  };
  const { handleChange, handleSubmit, values, touched, errors } = useFormik({
    enableReinitialize: true,
    initialValues: initialValue,
    validationSchema: ProfileValidation,
    onSubmit: async (value) => {
      console.log("register value", value);
      await dispatch(updateProfile(value)).unwrap();
      // await dispatch(updateUserByAdmin(value)).unwrap()
      await dispatch(getProfile()).unwrap();
      await dispatch(closeUserEditModel()).unwrap();
    },
  });
  return (
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
  );
};
export default EditUser;
