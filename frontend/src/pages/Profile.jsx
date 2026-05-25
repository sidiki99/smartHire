import { FiBell,  FiUser } from 'react-icons/fi';
import styles from './Profile.module.css';
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";


export default function Profile(){
    const navigate = useNavigate();
  
  const [form, setForm] = useState({
    phone: "",
    city: "",
    state: "",
    education: "",
    experience: "",
    skills: "",
    profile_pic: null,
    resume: null,
  });

  async function getCSRFToken() {

  await fetch(
    "http://127.0.0.1:8000/app/csrf/",
    {
      credentials: "include",
    }
  );
}
function getCookie(name) {

  let cookieValue = null;

  if (document.cookie && document.cookie !== "") {

    const cookies = document.cookie.split(";");

    for (let cookie of cookies) {

      cookie = cookie.trim();

      if (cookie.startsWith(name + "=")) {

        cookieValue = decodeURIComponent(
          cookie.substring(name.length + 1)
        );

        break;
      }
    }
  }

  return cookieValue;
}

  // GET PROFILE
  useEffect(() => {
    async function fetchProfile() {

      const res = await fetch(
        "http://127.0.0.1:8000/app/profile/",
        {
          credentials: "include"
        }
      );

      const data = await res.json();

      setForm((prev) => ({
        ...prev,
        ...data
      }));
    }

    fetchProfile();
  }, []);

  // TEXT INPUTS
  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  // PROFILE PIC
  function handleProfilePic(e) {

    const file = e.target.files[0];

    setForm({
      ...form,
      profile_pic: file
    });
  }

  // RESUME
  function handleResume(e) {

    const file = e.target.files[0];

    setForm({
      ...form,
      resume: file
    });
  }

async function handleSubmit(e) {

  e.preventDefault();

  // GET CSRF COOKIE
  await getCSRFToken();

  const csrftoken = getCookie("csrftoken");

  const formData = new FormData();

  formData.append("phone", form.phone);
  formData.append("city", form.city);
  formData.append("state", form.state);
  formData.append("education", form.education);
  formData.append("experience", form.experience);
  formData.append("skills", form.skills);

  if (form.profile_pic) {
    formData.append("profile_pic", form.profile_pic);
  }

  if (form.resume) {
    formData.append("resume", form.resume);
  }

  const res = await fetch(
    "http://127.0.0.1:8000/app/profile/update/",
    {
      method: "POST",
      credentials: "include",

      headers: {
        "X-CSRFToken": csrftoken,
      },

      body: formData
    }
  );

  const data = await res.json();

  console.log(data);

  alert(data.message);
}

  
  return(
    <div>
    
      <main className={styles.mainContent } >
        {/* Top Header */}
        <header className={styles.topHeader}>
          <div className={styles.headerLeft}>
            <h2>Your Profile</h2>
          </div>
          <div className={styles.headerRight}>
            <FiBell  className={styles.icon} />
            <div className={styles.profile}>
              <FiUser className={styles.icon} />
              <span>Profile</span>
            </div>
            
          </div>
          </header>
          
         
      <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.grid}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
          Phone <span className={styles.required}>*</span>
          </label>
           <input
            type="text"
            className={styles.inputField}
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
           
          />
        </div>

         <div className={styles.formGroup}>
          <label className={styles.label}>
            Experience <span className={styles.required}>*</span>
          </label>
          <input
             name="experience"
            value={form.experience}
            onChange={handleChange}
            placeholder="Experience"
            className={styles.inputField}
            />
        </div>
            

           
            <div className={styles.formGroup}>
              <label className={styles.label}>
               City Name <span className={styles.required}>*</span>
              </label>

              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                className={styles.inputField}
             
              />
            </div>
        

        {/* Row 3 */}
        <div className={styles.formGroup}>
          <label className={styles.label}>
            State Name<span className={styles.required}>*</span>
          </label>

          <input
            type="text"
            name="state"
            placeholder="State"
            className={styles.inputField}
            value={form.state}
            onChange={handleChange}
          />
        </div>

       
         {/* Row 3 */}
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Education Level<span className={styles.required}>*</span>
          </label>
          <input
          type="text" 
          placeholder="education" 
          className={styles.inputField} 
          value={form.education}
          name="education"
          onChange={handleChange}/>
        </div>

         <div className={styles.formGroup}>
          <label className={styles.label}>
            Skills
            <span className={styles.required}>
              * (Required Formate :python,machine learning,mysql etc)
            </span>
          </label>

          <input
            type="text"
            name="skills"
            placeholder="python,machine learning,mysql etc"
            className={styles.inputField}
            value={form.skills}
            onChange={handleChange}
          />
        </div>

        {/* Profile Picture Field */}
<div className={styles.formGroup}>
  <label className={styles.label}>
    Profile Picture<span className={styles.required}>*</span>
  </label>

  <input
    type="file"
     onChange={handleProfilePic}
      className={styles.inputField}
    
  />
</div>

{/* CV Upload Field */}
<div className={styles.formGroup}>
  <label className={styles.label}>
    Upload CV<span className={styles.required}>*</span>
  </label>

  <input
    type="file"
    onChange={handleResume}
    className={styles.inputField}
  />
</div>

         </div>

         
         <br></br>

        

        <div className={styles.footerContainer}>
   
      <div className={styles.buttonRow}>
        <button type="button" className={styles.closeBtn}
        onClick={() => navigate("/")}
        >Close</button>
        <button type="submit" className={styles.submitBtn}>Submit</button>
      </div>
    </div>



        
        </form>
        </div>

 </main>  
    </div>
    
  )
}