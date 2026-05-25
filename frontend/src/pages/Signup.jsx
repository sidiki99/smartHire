import { useState } from "react";
import styles from './Profile.module.css';
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
  e.preventDefault();

  try {

    const res = await fetch("http://127.0.0.1:8000/app/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(form)
    });

    const data = await res.json();

    console.log("SERVER RESPONSE:", data);

    if (res.ok) {

      alert(data.message || "Signup successful");

      navigate("/signin");

    } else {

      alert(data.error || "Signup failed");

    }

  } catch (error) {

    console.log("ERROR:", error);

    alert("Server error: " + error.message);
  }
}
  return (
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
            {/* </div> */}

            <div className={styles.formGroup}>
             <label className={styles.label}>
             Email <span className={styles.required}>*</span>
             </label>

              <input
                name="email"
                placeholder="Email"
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
              onClick={() => navigate("/signin")}
              >Login</button>
              <button type="submit" className={styles.submitBtn}>Signup</button>
            </div>
          </div>
    
     
      
    </form>
    </div>
    </main>
    </div>
  );
}