import * as Yup from "yup";

export const ProductFormValidation = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!!")
    .max(50, "Too Long!!")
    .required("Product name is required"),
  price: Yup.string().required("Product price is required"),
  image: Yup.mixed().required("Product image url is required"),
  quantity: Yup.number().required("Quantity is required"),
});

export const LoginValidation = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const RegisterValidation = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!!")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Too Short!!")
    .required("Last name is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const ProfileValidation = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!!")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Too Short!!")
    .required("Last name is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const ShippingValidation = Yup.object().shape({
  address: Yup.string()
    .min(5, "Address is too Short!!")
    .max(100, "Address is too Long!!")
    .required("Address is required"),
  phone: Yup.string()
    .max(10, "Wrong phone number")
    .required("Phone number is required"),
  city: Yup.string().required("City is requuired"),
  state: Yup.string().required("State is required"),
  pincode: Yup.string()
    .min(6, "Wrong pincode")
    .max(6, "Wrong pincode")
    .required("Pincode is required"),
});

export const enquiryFormValidation = Yup.object().shape({
  email: Yup.string().required("Email is required"),
});
