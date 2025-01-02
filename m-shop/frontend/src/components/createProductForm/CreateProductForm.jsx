import { useFormik } from "formik";
import { ProductFormValidation } from "../../validationSchema/ValidationSchema";
import PropTypes from "prop-types";
import Input from "../formComponent/inputField/Input";
import SubmitButton from "../formComponent/submitButton/SubmitButton";
import FormHeading from "../formComponent/formHeading/FormHeading";
import "./createProductForm.scss";
import { useDispatch } from "react-redux";
import { closeAddProductModel } from "../../features/productModelSlice";
import { createProducts, allProducts } from "../../features/productSlice";

const CreateProductForm = () => {
  const dispatch = useDispatch();

  const handleCreateProduct = (productData) => {
    console.log("productData", productData);
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("price", productData.price);
    formData.append("quantity", productData.quantity);
    formData.append("image", productData.image);    
    console.log("formData", formData);

    dispatch(createProducts(formData)).then(() => {
      dispatch(allProducts());
    });
  };
  const initialValue = {
    name: "",
    price: "",
    image: "",
    quantity: "",
  };

  const { handleChange, handleSubmit, touched, errors, values, setFieldValue } =
    useFormik({
      initialValues: initialValue,
      validationSchema: ProductFormValidation,
      onSubmit: (value, action) => {
        console.log("Submitted value", value);
        handleCreateProduct(value);
        dispatch(closeAddProductModel());
        action.resetForm();
      },
    });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFieldValue("image", file);
  };
  console.log("create from values", values);

  return (
    <>
      <FormHeading heading={"Add Product"} />
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
          placeholder={"Add Quantity"}
          touched={touched.quantity}
          errors={errors.quantity}
        />

        {/* <Input
          type={"text"}
          name={"image"}
          handleChange={handleChange}
          values={values.image}
          placeholder={"Product Image URL"}
          touched={touched.image}
          errors={errors.image}
        /> */}
        <Input
          type={"file"}
          name={"image"}
          handleChange={handleFileChange}
          // values={values.image}
          placeholder={"Product Image"}
          touched={touched.image}
          errors={errors.image}
        />
        <SubmitButton type={"submit"} title={"Add Product"} />
      </form>
    </>
  );
};
export default CreateProductForm;
CreateProductForm.propTypes = {
  onSubmit: PropTypes.func,
};
