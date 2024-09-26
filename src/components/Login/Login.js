import { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io5";
import { loginAdmin } from '../../api/api';



const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isGuestLoading, setIsGuestLoading] = useState(false);

  const notify = () => {
    toast.success('Logged in successfully!', { position: 'top-center' });
  };
  const notify2 = () => {
    toast.error('Invalid Credentials!', { position: 'top-right' });
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Please Enter your Email")
      .email("Invalid Email"),
    password: Yup.string()
      .required("Please Enter your Password")
  });

  const handleChange = (event) => {
    setIsLoading(false);
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleLogin = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setIsLoading(true);

      const result = await loginAdmin(formData);
      setIsLoading(false); 

      if (result) {
        notify();
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
        return;
      }
    }
    catch (error) {
      if (error.inner && error.inner.length > 0) {
        toast.error(error.inner[0].message);
      }
      else {
        toast.error(error.message);
      }
    }
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  };

  const guestLogin = async (event) => {
    setFormData({email:'',password:''});
    setIsGuestLoading(true);

    const result = await loginAdmin({
      email: 'davidjhaa4u@gmail.com',
      password: '00000000',
    });

    setIsGuestLoading(false);

    if (result) {
      notify();
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
      return;
    }

    notify2();
  };

  return (
    <div className={styles.main}>
      <div className={styles.parent}>
        <div className={styles.form}>
          <div className={styles.content}>
            <h2 className={styles.title}>Log In</h2>
            <div className={styles.form__icons}>
              <FcGoogle className={styles.formIcon} alt="icon1" />
              <FaFacebook className={styles.formIcon2} alt="icon2" />
              <IoLogoTwitter className={styles.formIcon3} alt="icon3" />
            </div>
            <span className={styles.formSpan}>
              or use email for login
            </span>
            <input
              className={styles.formInput}
              type="text"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              className={styles.formInput}
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <a href="" className={styles.forgetPassword}>
              Forget password ?
            </a>
            <div className={styles.loginSignupbtn}>
              <button 
                className={styles.button} 
                onClick={() => handleLogin()} 
                disabled={isLoading} 
              >
              {isLoading ? (
                <div className={styles.loader}></div>
              ) : (
                "Login"
              )}
              </button>
              <button
                className={styles.button}
                onClick={() => guestLogin()}
                disabled={isLoading}
              >
                {isGuestLoading ? (
                <div className={styles.loader}></div>
              ) : (
                "Guest login"
              )}
              </button>
            </div>
          </div>
        </div>
        <div className={styles.switchContainer2}>
          <div className={styles.bottomCircle}></div>
          <div className={styles.upperCircle}></div>
          <div className={styles.welcomeNote}>
            <h2 className={styles.title}>Welcome Back!</h2>
            <p className={styles.description}>
              Great to see you again! <br />Let's pick up where you left off.
            </p>
            <button
              className={styles.signInbutton}
              onClick={() => navigate("/signUp")}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default Login;
