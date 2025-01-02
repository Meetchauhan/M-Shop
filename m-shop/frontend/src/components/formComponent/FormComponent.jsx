import Input from "./inputField/Input";
import SubmitButton from "./submitButton/SubmitButton";
import PropTypes from "prop-types";

const FormComponent = ({
  heading,
  handleSubmit,
  handleChange,
  values,
  touched,
  errors,
  name,
  placeholder,
  type,
}) => {
  return (
    <div className="form">
      <div className="form_heading">
        <h2>{heading}</h2>
        <div className="form_wrapper">
          <form onSubmit={handleSubmit}>
            <Input
              values={values}
              name={name}
              type={type}
              placeholder={placeholder}
              touched={touched}
              errors={errors}
              handleChange={handleChange}
            />
            <Input
              values={values}
              name={name}
              type={type}
              placeholder={placeholder}
              touched={touched}
              errors={errors}
              handleChange={handleChange}
            />
            <Input
              values={values}
              name={name}
              type={type}
              placeholder={placeholder}
              touched={touched}
              errors={errors}
              handleChange={handleChange}
            />
            <Input
              values={values}
              name={name}
              type={type}
              placeholder={placeholder}
              touched={touched}
              errors={errors}
              handleChange={handleChange}
            />
            <SubmitButton type={"submit"} title={"Submit"} />
          </form>
        </div>
      </div>
    </div>
  );
};
export default FormComponent;

FormComponent.propTypes = {
  heading: PropTypes.string,
  handleSubmit: PropTypes.string,
  handleChange: PropTypes.string,
  values: PropTypes.string,
  touched: PropTypes.string,
  errors: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};
