import Input from "../formComponent/inputField/Input";
import "./footer.scss";
import logo from "../../images/mainLogo.png";
import ContactBtn from "../buttons/contactBtn/ContactBtn";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { enquiryFormValidation } from "../../validationSchema/ValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import { enqueryMail } from "../../features/enqueryMailSlice";
import { useEffect, useState } from "react";

const Footer = () => {
  const [handleMailMessage, setHandleMailMessage] = useState(false);
  const dispatch = useDispatch();
  const mailMessage = useSelector((mail) => mail?.enquery?.enquery?.message);
  const sendMailLoader = useSelector((mail) => mail?.enquery?.loading);
  console.log("mail message", mailMessage);
  console.log("handle mail message", handleMailMessage);
  console.log("send mail loader", sendMailLoader);    

  useEffect(() => {
    if (sendMailLoader) {
      setHandleMailMessage(false);
    } else {
      setHandleMailMessage(true);
      setTimeout(() => {
        setHandleMailMessage(false);
      }, 3000);
    }
  }, [sendMailLoader]);

  const initialValue = {
    email: "",
  };
  const { handleChange, handleSubmit, touched, errors, values } = useFormik({
    initialValues: initialValue,
    validationSchema: enquiryFormValidation,
    onSubmit: (value, action) => {
      console.log("value", value);
      dispatch(enqueryMail(value));

      action.resetForm();
    },
  });
  return (
    <footer>
      <div className="container">
        <div className="footer_wrap">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="first">
            <div className="col1">
              <div className="text">
                Built with the MERN stack for a fast, secure, and scalable
                eCommerce experience
              </div>
            </div>
            <div className="col2">
              <div className="text">Have questions? Reach out to us at </div>
              <form onSubmit={handleSubmit}>
                <Input
                  name={"email"}
                  handleChange={handleChange}
                  values={values.email}
                  placeholder={"Email"}
                  errors={errors.email}
                  touched={touched.email}
                  type={"email"}
                />
                <ContactBtn primaryText={"Submit"} alternateText={"Submit"} />
              </form>
              {sendMailLoader && (
                <p className="sendMailMsg">Sending Enquery Mail...!</p>
              )}
              {handleMailMessage && (
                <p className="sendMailMsg">{mailMessage}</p>
              )}
            </div>
            <div className="col3">
              <div className="socials">
                <div className="title">Socials</div>
                <ul className="icons">
                  <li className="icon">
                    <Link
                      to={
                        "https://www.facebook.com/meet.chauhan.330?mibextid=wwXIfr&rdid=brPsHWvfmfITljBN&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AjCSYxieV%2F%3Fmibextid%3DwwXIfr"
                      }
                      target="_blank"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 32 32"
                      >
                        <path d="M16,2c-7.732,0-14,6.268-14,14,0,6.566,4.52,12.075,10.618,13.588v-9.31h-2.887v-4.278h2.887v-1.843c0-4.765,2.156-6.974,6.835-6.974,.887,0,2.417,.174,3.043,.348v3.878c-.33-.035-.904-.052-1.617-.052-2.296,0-3.183,.87-3.183,3.13v1.513h4.573l-.786,4.278h-3.787v9.619c6.932-.837,12.304-6.74,12.304-13.897,0-7.732-6.268-14-14-14Z"></path>
                      </svg>
                    </Link>
                  </li>
                  <li className="icon">
                    <Link
                      to="https://www.instagram.com/meet_224/profilecard/?igsh=Z3Y3b2h3ejBnbGVw"
                      target="_blank"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 32 32"
                      >
                        <path d="M10.202,2.098c-1.49,.07-2.507,.308-3.396,.657-.92,.359-1.7,.84-2.477,1.619-.776,.779-1.254,1.56-1.61,2.481-.345,.891-.578,1.909-.644,3.4-.066,1.49-.08,1.97-.073,5.771s.024,4.278,.096,5.772c.071,1.489,.308,2.506,.657,3.396,.359,.92,.84,1.7,1.619,2.477,.779,.776,1.559,1.253,2.483,1.61,.89,.344,1.909,.579,3.399,.644,1.49,.065,1.97,.08,5.771,.073,3.801-.007,4.279-.024,5.773-.095s2.505-.309,3.395-.657c.92-.36,1.701-.84,2.477-1.62s1.254-1.561,1.609-2.483c.345-.89,.579-1.909,.644-3.398,.065-1.494,.081-1.971,.073-5.773s-.024-4.278-.095-5.771-.308-2.507-.657-3.397c-.36-.92-.84-1.7-1.619-2.477s-1.561-1.254-2.483-1.609c-.891-.345-1.909-.58-3.399-.644s-1.97-.081-5.772-.074-4.278,.024-5.771,.096m.164,25.309c-1.365-.059-2.106-.286-2.6-.476-.654-.252-1.12-.557-1.612-1.044s-.795-.955-1.05-1.608c-.192-.494-.423-1.234-.487-2.599-.069-1.475-.084-1.918-.092-5.656s.006-4.18,.071-5.656c.058-1.364,.286-2.106,.476-2.6,.252-.655,.556-1.12,1.044-1.612s.955-.795,1.608-1.05c.493-.193,1.234-.422,2.598-.487,1.476-.07,1.919-.084,5.656-.092,3.737-.008,4.181,.006,5.658,.071,1.364,.059,2.106,.285,2.599,.476,.654,.252,1.12,.555,1.612,1.044s.795,.954,1.051,1.609c.193,.492,.422,1.232,.486,2.597,.07,1.476,.086,1.919,.093,5.656,.007,3.737-.006,4.181-.071,5.656-.06,1.365-.286,2.106-.476,2.601-.252,.654-.556,1.12-1.045,1.612s-.955,.795-1.608,1.05c-.493,.192-1.234,.422-2.597,.487-1.476,.069-1.919,.084-5.657,.092s-4.18-.007-5.656-.071M21.779,8.517c.002,.928,.755,1.679,1.683,1.677s1.679-.755,1.677-1.683c-.002-.928-.755-1.679-1.683-1.677,0,0,0,0,0,0-.928,.002-1.678,.755-1.677,1.683m-12.967,7.496c.008,3.97,3.232,7.182,7.202,7.174s7.183-3.232,7.176-7.202c-.008-3.97-3.233-7.183-7.203-7.175s-7.182,3.233-7.174,7.203m2.522-.005c-.005-2.577,2.08-4.671,4.658-4.676,2.577-.005,4.671,2.08,4.676,4.658,.005,2.577-2.08,4.671-4.658,4.676-2.577,.005-4.671-2.079-4.676-4.656h0"></path>
                      </svg>
                    </Link>
                  </li>
                  <li className="icon">
                    <Link
                      to="https://www.linkedin.com/in/meet-chauhan-00812317b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                      target="_blank"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 32 32"
                      >
                        <path
                          d="M26.111,3H5.889c-1.595,0-2.889,1.293-2.889,2.889V26.111c0,1.595,1.293,2.889,2.889,2.889H26.111c1.595,0,2.889-1.293,2.889-2.889V5.889c0-1.595-1.293-2.889-2.889-2.889ZM10.861,25.389h-3.877V12.87h3.877v12.519Zm-1.957-14.158c-1.267,0-2.293-1.034-2.293-2.31s1.026-2.31,2.293-2.31,2.292,1.034,2.292,2.31-1.026,2.31-2.292,2.31Zm16.485,14.158h-3.858v-6.571c0-1.802-.685-2.809-2.111-2.809-1.551,0-2.362,1.048-2.362,2.809v6.571h-3.718V12.87h3.718v1.686s1.118-2.069,3.775-2.069,4.556,1.621,4.556,4.975v7.926Z"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </Link>
                  </li>
                  <li className="icon">
                    <Link to="https://github.com/meetchauhan" target="_blank">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 32 32"
                      >
                        <path d="M16,2.345c7.735,0,14,6.265,14,14-.002,6.015-3.839,11.359-9.537,13.282-.7,.14-.963-.298-.963-.665,0-.473,.018-1.978,.018-3.85,0-1.312-.437-2.152-.945-2.59,3.115-.35,6.388-1.54,6.388-6.912,0-1.54-.543-2.783-1.435-3.762,.14-.35,.63-1.785-.14-3.71,0,0-1.173-.385-3.85,1.435-1.12-.315-2.31-.472-3.5-.472s-2.38,.157-3.5,.472c-2.677-1.802-3.85-1.435-3.85-1.435-.77,1.925-.28,3.36-.14,3.71-.892,.98-1.435,2.24-1.435,3.762,0,5.355,3.255,6.563,6.37,6.913-.403,.35-.77,.963-.893,1.872-.805,.368-2.818,.963-4.077-1.155-.263-.42-1.05-1.452-2.152-1.435-1.173,.018-.472,.665,.017,.927,.595,.332,1.277,1.575,1.435,1.978,.28,.787,1.19,2.293,4.707,1.645,0,1.173,.018,2.275,.018,2.607,0,.368-.263,.787-.963,.665-5.719-1.904-9.576-7.255-9.573-13.283,0-7.735,6.265-14,14-14Z"></path>
                      </svg>
                    </Link>
                  </li>
                  <li className="icon">
                    <Link to="https://x.com/meet_224?s=21" target="_blank">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 32 32"
                      >
                        <path d="M18.42,14.009L27.891,3h-2.244l-8.224,9.559L10.855,3H3.28l9.932,14.455L3.28,29h2.244l8.684-10.095,6.936,10.095h7.576l-10.301-14.991h0Zm-3.074,3.573l-1.006-1.439L6.333,4.69h3.447l6.462,9.243,1.006,1.439,8.4,12.015h-3.447l-6.854-9.804h0Z"></path>
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col4">
              <div className="contact">
                <div className="title">Contact Us</div>
                <div className="number">
                  <Link to={"tel:9904227373"}>+91 9904227373</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="second">
            <div className="left">© 2025 M-Shop. All rights reserved.</div>
            <div className="right"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
