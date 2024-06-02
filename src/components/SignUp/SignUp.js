import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Signup.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerAdmin } from '../../api/api';


function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
  });

  const notify = () => {
    toast.success("signed Up successfully !", {
      position: "top-center"
    });
  }

  const handleChange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
      let flag = true;

      if (formData.name.trim() === "") {
        setFormData(prevState => ({ ...prevState, name: "Invalid Name" }));
        flag = false;
      }
      if (formData.email.trim() === "") {
        setFormData(prevState => ({ ...prevState, email: "Invalid Email" }));
        flag = false;
      }
      if (formData.password.trim() === "") {
        setFormData(prevState => ({ ...prevState, password: "weak Password" }));
        flag = false;
      }
      if (formData.confirmPassword.trim() === "") {
          setFormData(prevState => ({ ...prevState, confirmPassword: "Password doesn't match" }));
        flag = false;
      }
      console.log(formData);
      if(formData.password !== formData.confirmPassword){
        return;
      }

      if(!flag){
        return;
      }

      const result = await registerAdmin(formData).catch(error => {
        notify(error.message);
    });

      if(result){
        console.log(result);
        notify("Registration successful");
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }
  };
    
  return (
    <div className={styles.app}>
      <div className = {styles.parent}>
        <div className={styles.main}>
          <h1 className={styles.heading}>QUIZZIE</h1>
          <div className={styles.container}>
            <div className={styles.signup}>Sign Up</div>
            <div onClick={ () => navigate('/login')} className={styles.login}>Login</div>
          </div>
          <div className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label}>Name</label>
              <input
                  style={{ color: formData.name === "Invalid Name" ? "red" : null }}
                  className={styles.input}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type={"text"}
              ></input>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input
                  style={{ color: formData.email === "Invalid Email" ? "red" : null }}
                  className={styles.input}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type={"email"}
              ></input>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Password</label>
              <input
                  style={{ color: formData.password === "weak Password" ? "red" : null }}
                  className={styles.input}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type={"text"}
              ></input>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Confirm Password</label>
              <input
                  style={{ color: formData.confirmPassword === "Password doesn't match" ? "red" : null }}
                  className={styles.input}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  type={"text"}
              ></input>
            </div>

            <button onClick={handleSubmit} className={styles.button}>
                SignUp
            </button>

          </div>
        </div>
        <ToastContainer autoClose={1000}/>
      </div>
    </div>
  )
}

export default SignUp