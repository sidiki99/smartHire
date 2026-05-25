import { useState } from "react";
import { FiBell, FiUser } from 'react-icons/fi';
import styles from './AddJobs.module.css';
import { useNavigate } from "react-router-dom";

function CompanyForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company_name: "",
    website: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    logo: null
  });

  const handleChange = (e) => {

    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

 const handleSubmit = async (e) => {

  e.preventDefault();

  const data = new FormData();

  data.append("company_name", formData.company_name);
  data.append("website", formData.website);
  data.append("email", formData.email);
  data.append("phone", formData.phone);
  data.append("address", formData.address);
  data.append("description", formData.description);

  if (formData.logo) {
    data.append("logo", formData.logo);
  }

  try {

    const response = await fetch(
      "http://127.0.0.1:8000/app/company/",
      {
        method: "POST",
        body: data
      }
    );

    const result = await response.json();

    console.log(result);

    if (response.ok) {

      alert(result.message);

    } else {

      alert(result.error);

    }

  } catch (error) {

    console.log(error);

  }
};
  return (
    <div>
    
          <main className={styles.mainContent}>
    
            {/* Header */}
            <header className={styles.topHeader}>
              <div className={styles.headerLeft}>
                <h2>Add Company</h2>
              </div>
    
              <div className={styles.headerRight}>
                <FiBell className={styles.icon} />
                <div className={styles.profile}>
                  <FiUser className={styles.icon} />
                  <span>Profile</span>
                </div>
              </div>
            </header>
    
    <div>

       <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.grid}>

  
        <div className={styles.formGroup}>
        <label>Company Name 
          <span className={styles.required}>*</span>
        </label>
        
        <input
          type="text"
          name="company_name"
          placeholder="Company Name"
          onChange={handleChange}
          className={styles.inputField}
        />
        </div>
     <div className={styles.formGroup}>
        <label>Logo
          <span className={styles.required}>*</span>
        </label>

        <input
          type="file"
          name="logo"
          onChange={handleChange}
          className={styles.inputField}
        />
        </div>

        <div className={styles.formGroup}>
        <label>Website 
          <span className={styles.required}>*</span>
        </label>

        <input
          type="text"
          name="website"
          placeholder="Website"
          onChange={handleChange}
          className={styles.inputField}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Email 
          <span className={styles.required}>*</span>
        </label>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className={styles.inputField}
        />
        </div>

        <div className={styles.formGroup}>
        <label>Phone
          <span className={styles.required}>*</span>
        </label>

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          className={styles.inputField}
        />
       </div>
       <div className={styles.formGroup}>
        <label>Address
          <span className={styles.required}>*</span>
        </label>
       
   

        <input
          name="address"
          placeholder="Address"
          onChange={handleChange}
          className={styles.inputField}
        />
        </div>
        </div>
        <br /><br />

        <div className={styles.formGroup}>
        <label>Description
          <span className={styles.required}>*</span>
        </label>
        

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
           className={styles.textArea}
        />
        </div>
        
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

    </div>
    </main>
    </div>
  );
}

export default CompanyForm;