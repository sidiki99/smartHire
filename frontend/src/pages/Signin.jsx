import { useState } from "react";
import styles from './Profile.module.css';
import { useNavigate } from "react-router-dom"


export default function Signin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:8000/app/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(form)
    });

    if (res.ok) {
      navigate("/"); // redirect after login
    } else {
      alert("Login failed");
    }
  }

  return (
  
    // <form onSubmit={handleSubmit}>
    //   <input
    //     name="username"
    //     placeholder="Username"
    //     onChange={handleChange}
    //   />

    //   <input
    //     name="password"
    //     type="password"
    //     placeholder="Password"
    //     onChange={handleChange}
    //   />

    //   <button type="submit">Login</button>
    // </form>
     <div>
            
              {/* <main className={styles.mainContent } >
       <div className={styles.formContainer}> */}
              <main className={styles.formMain } >
       <div className={styles.popup}>
             <form onSubmit={handleSubmit}>
               {/* <div className={styles.grid}> */}
               <div className={styles.formGroup}>
                 <label className={styles.label}>
                 Username <span className={styles.required}>*</span>
                 </label>
                <input
                type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  className={styles.inputField}
                />
                </div>
                
          <div className={styles.formGroup}>
                 <label className={styles.label}>
                Password <span className={styles.required}>*</span>
                 </label>
    
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  className={styles.inputField}
                />
                </div>
    
          <br></br>
          
                  
          
                  <div className={styles.footerContainer}>
             
                <div className={styles.buttonRow}>
                  <button type="button" className={styles.closeBtn}
                  onClick={() => navigate("/signup")}
                  >Signup</button>
                  <button type="submit" className={styles.submitBtn}>Login</button>
                </div>
              </div>
        
         
          
        </form>
        </div>
        </main>
        </div>
  );
}