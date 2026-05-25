import { useEffect, useState } from "react";
import { FiBell,  FiUser } from 'react-icons/fi';
import styles from './Profile.module.css';

export default function Profile() {

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

  // SUBMIT
  // async function handleSubmit(e) {

  //   e.preventDefault();

  //   const formData = new FormData();

  //   formData.append("phone", form.phone);
  //   formData.append("city", form.city);
  //   formData.append("state", form.state);
  //   formData.append("education", form.education);
  //   formData.append("experience", form.experience);
  //   formData.append("skills", form.skills);

  //   // FILES
  //   if (form.profile_pic) {
  //     formData.append("profile_pic", form.profile_pic);
  //   }

  //   if (form.resume) {
  //     formData.append("resume", form.resume);
  //   }

  //   const res = await fetch(
  //     "http://127.0.0.1:8000/app/profile/update/",
  //     {
  //       method: "POST",
  //       credentials: "include",
  //       body: formData
  //     }
  //   );

  //   const data = await res.json();

  //   alert(data.message);
  // }

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

  return (
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

    <form onSubmit={handleSubmit}>

      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone"
      />

      <input
        name="city"
        value={form.city}
        onChange={handleChange}
        placeholder="City"
      />

      <input
        name="state"
        value={form.state}
        onChange={handleChange}
        placeholder="State"
      />

      <input
        name="education"
        value={form.education}
        onChange={handleChange}
        placeholder="Education"
      />

      <input
        name="experience"
        value={form.experience}
        onChange={handleChange}
        placeholder="Experience"
      />

      <input
        name="skills"
        value={form.skills}
        onChange={handleChange}
        placeholder="skills: python, django"
      />

      {/* PROFILE PIC */}
      <div className={styles.formGroup}>

        <label className={styles.label}>
          Upload Profile Picture
        </label>

        <input
          type="file"
          onChange={handleProfilePic}
          className={styles.inputField}
        />

      </div>

      {/* RESUME */}
      <div className={styles.formGroup}>

        <label className={styles.label}>
          Upload Resume
        </label>

        <input
          type="file"
          onChange={handleResume}
          className={styles.inputField}
        />

      </div>

      <button type="submit">
        Save Profile
      </button>

    </form>
    </main>
    </div>
  );
}