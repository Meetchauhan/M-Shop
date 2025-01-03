import { useFormik } from "formik";
import { ProductFormValidation } from "../../validationSchema/ValidationSchema";
import PropTypes from "prop-types";
import Input from "../formComponent/inputField/Input";
import SubmitButton from "../formComponent/submitButton/SubmitButton";
import FormHeading from "../formComponent/formHeading/FormHeading";
import { useDispatch } from "react-redux";
import { closeUpdateProductModel } from "../../features/productModelSlice";
import Select from "../formComponent/select/Select";

const UpdateProductForm = ({ product, onSubmit }) => {
  const dispatch = useDispatch();
  const initialValue = {
    name: product?.name || "",
    price: product?.price || "",
    quantity: product?.quantity || "",
    image: product?.image || "",
    category: product?.category || "",
  };

  const { handleChange, handleSubmit, touched, errors, values, setFieldValue } =
    useFormik({
      initialValues: initialValue,
      validationSchema: ProductFormValidation,
      onSubmit: (values, action) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("price", values.price);
        formData.append("quantity", values.quantity);
        formData.append("image", values.image);
        formData.append("category", values.category);

        // if (values.image instanceof File) {
        //   formData.append("image", values.image);
        // } else if (values.imageUrl) {
        //   formData.append("existingImageUrl", values.imageUrl);
        // }

        onSubmit(formData);
        dispatch(closeUpdateProductModel());
        action.resetForm();
      },
    });
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFieldValue("image", file);
  };

  return (
    <>
      <FormHeading heading={"Update Product"} />
      <form onSubmit={handleSubmit}>
        <Input
          type={"text"}
          name={"name"}
          handleChange={handleChange}
          values={values.name}
          placeholder={"Product name"}
          touched={touched.name}
          errors={errors.name}
        />

        <Input
          type={"text"}
          name={"price"}
          handleChange={handleChange}
          values={values.price}
          placeholder={"Product Price"}
          touched={touched.price}
          errors={errors.price}
        />
        <Input
          type={"number"}
          name={"quantity"}
          handleChange={handleChange}
          values={values.quantity}
          placeholder={"Product Quantity"}
          touched={touched.quantity}
          errors={errors.quantity}
        />
        <Select
          name={"category"}
          onChange={handleChange}
          value={values.category}
          defaultValue={"Select Category"}
        />
        <Input
          type={"text"}
          name={"image"}
          handleChange={handleChange}
          values={values.image}
          placeholder={"Product Image URL"}
          touched={touched.image}
          errors={errors.image}
        />
        {/* <Input
          type={"file"}
          name={"image"}
          handleChange={handleFileChange}
          // values={values.image}
          placeholder={"Product Image URL"}
          touched={touched.image}
          errors={errors.image}
        /> */}
        <SubmitButton type={"submit"} title={"Update Product"} />
      </form>
    </>
  );
};
export default UpdateProductForm;

UpdateProductForm.propTypes = {
  product: PropTypes.string,
  onSubmit: PropTypes.func,
};
