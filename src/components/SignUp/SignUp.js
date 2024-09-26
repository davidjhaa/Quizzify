import { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerAdmin } from '../../api/api';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io5";


const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Please Enter Your Name"),
    email: Yup.string()
      .required("Email is Required")
      .email("Invalid Email"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Passwords must match"),
      
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSignup = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setIsLoading(true);

      await registerAdmin(formData)
      setIsLoading(true);

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } 
    catch (error) {
      if (error.inner && error.inner.length > 0) {
        toast.error(error.inner[0].message);
      } 
      else {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.parent}>
        <div className={styles.switch__container}>
          <div className={styles.bottomCircle}></div>
          <div className={styles.upperCircle}></div>
          <div className={styles.welcomeNote}>
            <h2 className={styles.title}>Join Us Today!</h2>
            <p className={styles.description}>
              Sign up now and Experience seamless way of creating Quiz and share among folks
            </p>
            <button className={styles.signInbutton} onClick={() => navigate("/login")}>
              Log In
            </button>
          </div>
        </div>
        <div className={styles.form}>
          <div className={styles.content}>
            <h2 className={styles.title}>Create Account</h2>
            <div className={styles.form__icons}>
              <FcGoogle className={styles.formIcon} alt="icon1" />
              <FaFacebook className={styles.formIcon2} alt="icon2" />
              <IoLogoTwitter className={styles.formIcon3} alt="icon3" />
            </div>
            <span className={styles.formSpan}>
              or use email for registration
            </span>
            <input
              className={styles.form__input}
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              className={styles.form__input}
              type="text"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              className={styles.form__input}
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              className={styles.form__input}
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <div className={styles.loginSignupbtn}>
              <button 
                className={styles.button}
                onClick={handleSignup}
                disabled={isLoading}
              >
                {isLoading ? (
                <div className={styles.loader}></div>
              ) : (
                "Sign Up"
              )}
              </button>
              <button
                className={`${styles.button} ${styles.mobileOnlyButton}`}
                onClick={() => navigate('/login')}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default Signup;
