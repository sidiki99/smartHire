import { FiBell,  FiUser } from 'react-icons/fi';
import styles from './Profile.module.css';

import { useEffect, useState } from "react";


export default function AddJobs(){
  const [submitData, setSubmitData] = useState(null);
  const BASE_URL = 'http://localhost:10000';
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

 function handleChange(e){
   const {name,value} = e.target;
  setFormData({
    ...formData,
    [name]:value
  })
 }

 async function handleSubmit(e){
  e.preventDefault();

  const newJob ={
    ...formData,
    skills:formData.skills.split(","),
   
  }
   setSubmitData(newJob);
}
  useEffect(() => {

  if (!submitData) return;

  async function addJob() {

    try {

      const res = await fetch(`${BASE_URL}/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const data = await res.json();

      console.log(data);

      alert("Job Added Successfully");

    } catch (err) {
      console.log(err);
    }

  }

  addJob();

}, [submitData]);
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
        
 {/* Row 3 */}
        <div className={styles.formGroup}>
          <label className={styles.label}>
           Name <span className={styles.required}>*</span>
          </label>
          <input type="text"
           name="Name" 
          value={formData.companyName}
          placeholder="Name" 
          onChange={handleChange}
          className={styles.inputField} />
        </div>
         {/* Row 3 */}
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Email<span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            name="position"
            placeholder="Email"
            className={styles.inputField}
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        

     

        <div className={styles.formGroup}>
          <label className={styles.label}>
          Phone <span className={styles.required}>*</span>
          </label>
           <input
            type="number"
            name="Phone"
            placeholder="Phone"
            className={styles.inputField}
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
         <div className={styles.formGroup}>
                   <label className={styles.label}>
                     Select Experience <span className={styles.required}>*</span>
                   </label>
                               <select
                       name="experience"
                       className={styles.selectField}
                       value={formData.experience}
                       onChange={handleChange}
                     >
                       <option value="">Choose...</option>
                       <option value="6 mos">6 mos</option>
                       <option value="1 yr">1 yr</option>
                       <option value="2 yr">2 yr</option>
                       <option value="3 yr">3 yr</option>
                     </select>
                 </div>
                            {/* Password Field */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Password<span className={styles.required}>*</span>
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                className={styles.inputField}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Confirm Password<span className={styles.required}>*</span>
              </label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className={styles.inputField}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
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
        {/* Profile Picture Field */}
<div className={styles.formGroup}>
  <label className={styles.label}>
    Profile Picture<span className={styles.required}>*</span>
  </label>

  <input
    type="file"
    name="profilePic"
    accept="image/*"
    className={styles.inputField}
    onChange={handleChange}
    required
  />
</div>

{/* CV Upload Field */}
<div className={styles.formGroup}>
  <label className={styles.label}>
    Upload CV<span className={styles.required}>*</span>
  </label>

  <input
    type="file"
    name="cv"
    accept=".pdf,.doc,.docx"
    className={styles.inputField}
    onChange={handleChange}
    required
  />
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
   
      <div className={styles.buttonRow}>
        <button type="button" className={styles.closeBtn}>Close</button>
        <button type="submit" className={styles.submitBtn}>Submit</button>
      </div>
    </div>



        
        </form>
        </div>

 </main>  
    </div>
    
  )
}