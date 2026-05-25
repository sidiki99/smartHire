import { FiBell, FiUser } from 'react-icons/fi';
import styles from './AddJobs.module.css';
import { useEffect, useState } from "react";

export default function AddJobs() {

  const [companies, setCompanies] = useState([]);
  const [category, setCategory] = useState([]);

  const BASE_URL = "http://127.0.0.1:8000/app";

  const [formData, setFormData] = useState({
    companyName: "",
    position: "",
    category: "",
    jobType: "",
    vacancy: "",
    experience: "",
    postedDate: "",
    lastDate: "",
    salaryFrom: "",
    salaryTo: "",
    city: "",
    state: "",
    skills: "",
    education: "",
    description: "",
    status: "Active",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // convert & fix data
    const newJob = {
      ...formData,
      vacancy: Number(formData.vacancy),
      //category: Number(formData.category),
    };

    // IMPORTANT: use FormData (NOT JSON)
    const formDataToSend = new FormData();

    Object.keys(newJob).forEach((key) => {
      formDataToSend.append(key, newJob[key]);
    });

    try {
      const res = await fetch(`${BASE_URL}/add_job/`, {
        method: "POST",
        body: formDataToSend, // ❌ NO headers
      });

      const data = await res.json();

      console.log(data);

      if (res.ok) {
        alert("Job Added Successfully");
      } else {
        alert(data.error || "Error adding job");
      }

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const res = await fetch(`${BASE_URL}/get_company/`);
          const cat = await fetch(`${BASE_URL}/get_category/`);
        const data = await res.json();
        setCompanies(data);
        const c_data = await cat.json();
        setCategory(c_data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchCompanies();
  }, []);

  return (
    <div>

      <main className={styles.mainContent}>

        {/* Header */}
        <header className={styles.topHeader}>
          <div className={styles.headerLeft}>
            <h2>New Job</h2>
          </div>

          <div className={styles.headerRight}>
            <FiBell className={styles.icon} />
            <div className={styles.profile}>
              <FiUser className={styles.icon} />
              <span>Profile</span>
            </div>
          </div>
        </header>

        {/* FORM */}
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <div className={styles.grid}>

              {/* COMPANY (FIXED → ID instead of name) */}
              <div className={styles.formGroup}>
                <label>Company Name 
                  <span className={styles.required}>*</span>
                </label>

                <select
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={styles.inputField}
                >
                  <option value="">Select Company</option>

                  {companies.map((company) => (
                    <option
                      key={company.id}
                      value={company.id}   // ✅ FIXED HERE
                    >
                       {company.company_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* POSITION */}
              <div className={styles.formGroup}>
                <label>Position 
                  <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className={styles.inputField}
                />
              </div>

              {/* CATEGORY */}
              <div className={styles.formGroup}>
                <label>Job Category 
                  <span className={styles.required}>*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={styles.selectField}
                >
                  <option value="">Select Category</option>

                  {category.map((cat) => (
                    <option
                      key={cat.id}
                      value={cat.id}  
                       // ✅ FIXED HERE
                    >
                       {cat.name}
                       
                    </option>
                    
                  ))}
                </select>
              </div>
              

              {/* JOB TYPE */}
              <div className={styles.formGroup}>
                <label>Job Type 
                  <span className={styles.required}>*</span>
                </label>
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className={styles.selectField}
                >
                  <option value="">Choose...</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Remote">Remote</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              {/* VACANCY */}
              <div className={styles.formGroup}>
                <label>Vacancy 
                  <span className={styles.required}>*</span>
                </label>
                <input
                  type="number"
                  name="vacancy"
                  value={formData.vacancy}
                  onChange={handleChange}
                  className={styles.inputField}
                />
              </div>

              {/* EXPERIENCE */}
              <div className={styles.formGroup}>
                <label>Experience 
                  <span className={styles.required}>*</span>
                </label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className={styles.selectField}
                >
                  <option value="">Choose...</option>
                  <option value="6 mos">6 mos</option>
                  <option value="1 yr">1 yr</option>
                  <option value="2 yr">2 yr</option>
                  <option value="3 yr">3 yr</option>
                </select>
              </div>

              {/* DATES */}
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Posted Date 
                  <span className={styles.required}>*</span>
                </label>
                <input
                  type="date"
                  name="postedDate"
                  className={styles.inputField}
                  value={formData.postedDate}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
          <label className={styles.label}>
            Last Date To Apply <span className={styles.required}>*</span>
          </label>
          <input
            type="date"
            name="lastDate"
            className={styles.inputField}
            value={formData.lastDate}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
          Salary From <span className={styles.required}>*</span>
          </label>
           <input
            type="number"
            name="salaryFrom"
            placeholder="$"
            className={styles.inputField}
            value={formData.salaryFrom}
            onChange={handleChange}
          />
        </div>
         {/* Row 3 */}
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Salary To<span className={styles.required}>*</span>
          </label>
          <input
            type="number"
            name="salaryTo"
            placeholder="$"
            className={styles.inputField}
            value={formData.salaryTo}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            City Name <span className={styles.required}>*</span>
          </label>

          <input
            type="text"
            name="city"
            placeholder="Name"
            className={styles.inputField}
            value={formData.city}
            onChange={handleChange}
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
            placeholder="Name"
            className={styles.inputField}
            value={formData.state}
            onChange={handleChange}
          />
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
            value={formData.skills}
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
          placeholder="Education" 
          className={styles.inputField} 
          value={formData.education}
          name="education"
          onChange={handleChange}/>
        </div>

         </div>
         <br></br>

         <div className={styles.formGroup}>
          <label className={styles.label}>
            Description<span className={styles.required}>*</span>
          </label>
          <textarea
          name="description"
          placeholder="Enter full job description..."
          className={styles.textArea}
          value={formData.description}
          onChange={handleChange}
        />
        </div>

       
        


        <div className={styles.footerContainer}>
      {/* Status Radio Section */}
      <div className={styles.statusGroup}>
        <span>Status:</span>
        
        <label className={styles.radioLabel}>
                  <input
          type="radio"
          name="status"
          value="Active"
          checked={formData.status === "Active"}
          onChange={handleChange}
        />
          <span className={styles.customRadio}></span>
          Active
        </label>

        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="status"
            value="Inactive"
            checked={formData.status === "Inactive"}
            onChange={handleChange}
          />
          <span className={styles.customRadio}></span>
          In Active
        </label>
      </div>

      {/* Button Section */}
      <div className={styles.buttonRow}>
        <button type="button" className={styles.closeBtn}>Close</button>
        <button type="submit" className={styles.submitBtn}>Submit</button>
      </div>
    </div>



          </form>
        </div>

      </main>
    </div>
  );
}