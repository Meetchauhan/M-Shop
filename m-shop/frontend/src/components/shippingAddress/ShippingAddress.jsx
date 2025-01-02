import { useFormik } from "formik";
import FormHeading from "../../components/formComponent/formHeading/FormHeading";
import Input from "../../components/formComponent/inputField/Input";
import {  ShippingValidation } from "../../validationSchema/ValidationSchema";
import SubmitButton from "../../components/formComponent/submitButton/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import "./shippingAddress.scss";
import Cartline from "../cartline/Cartline";
import useUserProfile from "../../customHooks/useUserProfile/UseUserProfile";
import { useEffect } from "react";
import { createOrder } from "../../features/paymentSlice";
import { useRazorpay } from "react-razorpay";
import { orders } from "../../features/ordersSlice";
import { fetchProduct } from "../../features/cartSlice";
import { recentOrders } from "../../features/thankyouSlice";

const ShippingAddress = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const profile = useUserProfile();
  console.log("shipping profile", profile);
  const amount = useSelector((cartline) => cartline?.cart?.total?.totalAmount);
  const amountInPaisa = amount ? amount * 100 : 0;
  const paymentOrderId = useSelector((payment) => payment?.payment?.data?.id);
  console.log("payment order", paymentOrderId);
  console.log("payment amount", amount);

  const profileFirstName = profile?.firstName
    ? profile?.firstName
    : profile?.data?.firstName;

  const profileLastName = profile?.lastName
    ? profile?.lastName
    : profile?.data?.lastName;

  const profileEmail = profile?.email ? profile?.email : profile?.data?.email;
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const initialValue = {
    firstName: profileFirstName || "",
    lastName: profileLastName || "",
    email: profileEmail || "",
    phone: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
  };

  const { handleChange, handleSubmit, touched, errors, values } = useFormik({
    initialValues: initialValue,
    validationSchema: ShippingValidation,
    onSubmit: async (value, action) => {
      const orderResponse = await dispatch(
        createOrder({
          amount: amountInPaisa,
          currency: "INR",
          receipt: "RecReceipt no. 1",
        })
      );
      console.log("payment response", orderResponse);
      console.log("shipping values", value);
      

      if (orderResponse?.payload?.id) {
        handlePayment(
          amountInPaisa,
          orderResponse.payload.id,
          value.address,
          value.phone,
          value.city,
          value.state,
          value.pincode
        );
      } else {
        console.error("Order creation failed", orderResponse);
        alert("Failed to create order. Please try again.");
      }
      action.resetForm();
    },
  });
  console.log("shipping value after submit", values);

  const {  Razorpay } = useRazorpay();
  // error, isLoading,
  const handlePayment = async (
    amountInPaisa,
    paymentOrderId,
    address,
    phone,
    city,
    state,
    pincode
  ) => {
    if (!amountInPaisa || isNaN(amount)) {
      alert("Invalid amount. Please try again.");
      return;
    }

    const options = {
      key: "rzp_test_z2wNwzXb6dDt9P",
      amount: amountInPaisa,
      currency: "INR",
      name: "M-Shop",
      description: "Test Transaction",
      order_id: paymentOrderId, // Generate order_id on server
      handler: async (response) => {
        const result = await dispatch(
          orders({
            totalAmount: amountInPaisa,
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            address: address,
            phone: phone,
            city: city,
            state: state,
            pincode: pincode,
          })
        ).unwrap();
        console.log("payment result", result);

        if (result.success) {
          dispatch(recentOrders(result));
          dispatch(fetchProduct()).unwrap();
          navigate("/thank-you", { replace: true });
        }
      },
      prefill: {
        name: profileFirstName,
        email: profileEmail,
        contact: "9904227373",
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
    razorpayInstance.on("payment.failed", (response) => {
      console.error("Payment failed", response);
      alert("Payment Failed. Please try again.");
    });
  };

  return (
    <>
      <div className="shipping">
        <div className="form_wrapper">
          <FormHeading heading={"Shipping Address"} />
          <form onSubmit={handleSubmit}>
            <div className="field_wrap names">
              <Input
                type={"text"}
                name={"firstName"}
                placeholder={"First name"}
                handleChange={handleChange}
                values={profileFirstName || ""}
                touched={touched.firstName}
                errors={errors.firstName}
              />
              <Input
                type={"text"}
                name={"lastName"}
                placeholder={"Last name"}
                handleChange={handleChange}
                values={profileLastName || ""}
                touched={touched.lastName}
                errors={errors.lastName}
              />
            </div>
            <Input
              type={"email"}
              name={"email"}
              placeholder={"Email"}
              handleChange={handleChange}
              values={profileEmail || ""}
              touched={touched.email}
              errors={errors.email}
            />
            <Input
              type={"phone"}
              name={"phone"}
              placeholder={"Phone"}
              handleChange={handleChange}
              values={values.phone}
              touched={touched.phone}
              errors={errors.phone}
            />
            <Input
              type={"text"}
              name={"address"}
              placeholder={"Address"}
              handleChange={handleChange}
              values={values.address}
              touched={touched.address}
              errors={errors.address}
            />
            <div className="field_wrap cityState">
              <Input
                type={"number"}
                name={"pincode"}
                placeholder={"Pincode"}
                handleChange={handleChange}
                values={values.pincode}
                touched={touched.pincode}
                errors={errors.pincode}
              />
              <Input
                type={"text"}
                name={"city"}
                placeholder={"City"}
                handleChange={handleChange}
                values={values.city}
                touched={touched.city}
                errors={errors.city}
              />
              <Input
                type={"text"}
                name={"state"}
                placeholder={"State"}
                handleChange={handleChange}
                values={values.state}
                touched={touched.state}
                errors={errors.state}
              />
            </div>
            <div className="responsive_cartlive">
              <Cartline />
            </div>
            <SubmitButton type={"submit"} title={"Pay Now"} />
          </form>
        </div>
      </div>
      {/* {loginData?.auth?.data?.status === false && (
        <FormSubmitStatus status={loginData?.auth?.data?.message} />
      )} */}
    </>
  );
};
export default ShippingAddress;
