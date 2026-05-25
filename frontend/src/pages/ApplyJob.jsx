import styles from './ApplyJob.module.css';
import { useState } from "react";
import { 
  FiBriefcase,
  FiClock,
  FiUsers,
  FiTrendingUp,
  FiDollarSign,
  FiMapPin,
  FiBookOpen,
  FiCalendar,
    } from 'react-icons/fi';

export default function ApplyJob({
  setOpenPopup,
  selectedJob,
  currentUser,
}) {

  // FORM STATE
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    position: selectedJob?.position || "",
    phone: "",
    description: "",
    resume: "",
  });

  // HANDLE INPUT CHANGE
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // HANDLE FILE

  function handleFileChange(e) {

      const file = e.target.files[0];

      if (file) {
        setFormData({
          ...formData,
          resume: file,
        });
      }
  }

//   // SUBMIT FORM
//   function handleSubmitForm(e) {
//     e.preventDefault();

//     // GET OLD APPLICATIONS
//     // const oldApplications =
//     //   JSON.parse(localStorage.getItem("applications")) || [];

//     // // CHECK ALREADY APPLIED
//     // const alreadyApplied = oldApplications.find(
//     //   (item) =>
//     //     item.jobId === selectedJob.id &&
//     //     item.userId === currentUser.id
//     // );

//     const oldApplications =
//   JSON.parse(localStorage.getItem("applications")) || [];

// const alreadyApplied =
//   currentUser?.id && selectedJob?.id
//     ? oldApplications.some(
//         (item) =>
//           item.jobId === selectedJob.id &&
//           item.userId === currentUser.id
//       )
//     : false;
    
//     if (alreadyApplied) {
//       alert("You already applied for this job");
//       return;
//     }

//     // NEW APPLICATION OBJECT
//     const applicationData = {
//       applicationId: Date.now(),

//       userId: currentUser.id,
//       userName: formData.name,

//       jobId: selectedJob.id,
//       jobTitle: selectedJob.position,
//       companyName : selectedJob.companyName,
//       location: selectedJob.state,

//       email: formData.email,
//       phone: formData.phone,
//       description: formData.description,

//       resume: formData.resume,

//       status: "Pending",

//       appliedAt: new Date().toLocaleDateString(),
//     };

//     // PUSH NEW DATA
//     oldApplications.push(applicationData);

//     // SAVE IN LOCAL STORAGE
//     localStorage.setItem(
//       "applications",
//       JSON.stringify(oldApplications)
//     );

//     alert("Application Submitted");

//     setOpenPopup(false);

//     console.log(applicationData);
//   }

//  const oldApplications =
//   JSON.parse(localStorage.getItem("applications")) || [];

// const alreadyApplied =
//   currentUser?.id && selectedJob?.id
//     ? oldApplications.some(
//         (item) =>
//           item.jobId === selectedJob.id &&
//           item.userId === currentUser.id
//       )
//     : false;


async function handleSubmitForm(e) {

  e.preventDefault();

  const form = new FormData();

  form.append("user_id", currentUser.id);

  form.append("job_id", selectedJob.id);

  form.append("title", `${currentUser.name} Resume`);

  form.append("cover_letter", formData.description);

  form.append("resume", formData.resume);

  try {

    const response = await fetch(
      "http://127.0.0.1:8000/app/apply-job/",
      {
        method: "POST",

        body: form,

        credentials: "include",
      }
    );

    const data = await response.json();

    if (response.ok) {

      alert("Application Submitted");

      setOpenPopup(false);

      console.log(data);

    } else {

      alert(data.message || data.error);

    }

  } catch (error) {

    console.log(error);

    alert("Something went wrong");

  }
}

  return (
    <div className={styles.formMain}>
      <div className={styles.popup}>

        <form
          className={styles.form}
          onSubmit={handleSubmitForm}
        >

          <div className={styles.top}>
            <h2 style={{ color: "#D43109" }}>
              Apply Job as
            </h2>

            <h2 style={{ color: "#ffff" }}>{selectedJob?.position}</h2>

            <span
              className={styles.closeBtn}
              onClick={() => setOpenPopup(false)}
            >
              ✕
            </span>
          </div>

          <div className={styles.infoGrid}>
                        
                        <div className={styles.infoItem}>
                          <FiBriefcase /> {selectedJob.companyName}
                        </div>

                        <div className={styles.infoItem}>
                          <FiClock /> {selectedJob.jobType}
                        </div>

                        <div className={styles.infoItem}>
                          <FiUsers /> {selectedJob.vacancy} vcnc/vcncies
                        </div>

                        <div className={styles.infoItem}>
                          <FiTrendingUp /> {selectedJob.experience} Exp.
                        </div>

                        <div className={styles.infoItem}>
                          <FiDollarSign /> {selectedJob.salaryFrom}$ - {selectedJob.salaryTo}$
                        </div>

                        <div className={styles.infoItem}>
                          <FiMapPin /> {selectedJob.city} in {selectedJob.state}
                        </div>

                        <div className={styles.infoItem}>
                          <FiBookOpen /> {selectedJob.education} Edu.
                        </div>

                        <div className={styles.infoItem}>
                          <FiCalendar /> Strt: {selectedJob.postedDate}
                        </div>

                        <div className={styles.infoItem}>
                          <FiCalendar /> End: {selectedJob.lastDate}
                        </div>

                      </div>

          <div className={styles.a_grid}>

            {/* NAME */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Name <span className={styles.required}>*</span>
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                // onChange={handleChange}
                className={styles.inputField}
              />
            </div>

            {/* EMAIL */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Email <span className={styles.required}>*</span>
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>

            {/* POSITION */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Position <span className={styles.required}>*</span>
              </label>

              <input
                type="text"
                name="position"
                value={formData.position}
                // onChange={handleChange}
                className={styles.inputField}
              />
            </div>

            {/* PHONE */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Phone <span className={styles.required}>*</span>
              </label>

              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>

          </div>

          <br />

          {/* DESCRIPTION */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Description
              <span className={styles.required}>*</span>
            </label>

            <textarea
              name="description"
              placeholder="Enter full job description..."
              value={formData.description}
              onChange={handleChange}
              className={styles.textArea}
            ></textarea>
          </div>

          <br />

          {/* FILE */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Upload Resume
              <span className={styles.required}>*</span>
            </label>

            <input
              type="file"
              onChange={handleFileChange}
              className={styles.inputField}
            />

            <p>{formData.resume?.resume}</p>
          </div>

          <div className={styles.footerContainer}>
            <div className={styles.buttonRow}>

              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setOpenPopup(false)}
              >
                Close
              </button>

              {/* {alreadyApplied ?  */}
              
              <button
                type="submit"
                className={styles.submitBtn}
                disabled
              >
                Applied
              </button>
              
              <button
                type="submit"
                className={styles.submitBtn}
              >
                Apply Now
              </button>
              {/* } */}

            </div>
          </div>

        </form>
      </div>
    </div>
  );
}