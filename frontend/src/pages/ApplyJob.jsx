import styles from "./ApplyJob.module.css";

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
} from "react-icons/fi";

export default function ApplyJob({
  setOpenPopup,
  selectedJob,
  users
}) {

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    cover_letter: "",
    resume: null,
  });

  function handleChange(e) {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleFileChange(e) {

    setFormData({
      ...formData,
      resume: e.target.files[0],
    });
  }

  async function handleSubmitForm(e) {

    e.preventDefault();

  
    setLoading(true);

    const form = new FormData();

    form.append("job_id", selectedJob.id);

    form.append(
      "cover_letter",
      formData.cover_letter
    );

    if (formData.resume) {

        form.append(
          "resume",
          formData.resume
        );
      }

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/app/apply-job/",
        {
          method: "POST",

          credentials: "include",

          body: form,
        }
      );

      const data = await response.json();

      if (response.ok) {

        alert("Application Submitted");

        console.log(data);

        setOpenPopup(false);

      } else {

        alert(data.error || "Something went wrong");
      }

    } catch (error) {

      console.log(error);

      alert("Server error");
    }

    setLoading(false);
  }

  return (

    <div className={styles.formMain}>

      <div className={styles.popup}>

        <form
          className={styles.form}
          onSubmit={handleSubmitForm}
        >

          <div className={styles.top}>

            <h2 style={{ color: "#fff" }}>
              Apply for {selectedJob?.position}
            </h2>

            <span
              className={styles.closeBtn}
              onClick={() => setOpenPopup(false)}
            >
              ✕
            </span>

          </div>

          {/* JOB INFO */}

          <div className={styles.infoGrid}>

            <div className={styles.infoItem}>
              <FiBriefcase />
              {selectedJob.companyName}
            </div>

            <div className={styles.infoItem}>
              <FiClock />
              {selectedJob.jobType}
            </div>

            <div className={styles.infoItem}>
              <FiUsers />
              {selectedJob.vacancy} Vacancies
            </div>

            <div className={styles.infoItem}>
              <FiTrendingUp />
              {selectedJob.experience} Exp.
            </div>

            <div className={styles.infoItem}>
              <FiDollarSign />
              {selectedJob.salaryFrom}$ -
              {selectedJob.salaryTo}$
            </div>

            <div className={styles.infoItem}>
              <FiMapPin />
              {selectedJob.city},
              {selectedJob.state}
            </div>

            <div className={styles.infoItem}>
              <FiBookOpen />
              {selectedJob.education}
            </div>

            <div className={styles.infoItem}>
              <FiCalendar />
              Start: {selectedJob.postedDate}
            </div>

            <div className={styles.infoItem}>
              <FiCalendar />
              End: {selectedJob.lastDate}
            </div>

          </div>

          <br />

          {/* USER INFO */}

          <div className={styles.a_grid}>

            <div className={styles.formGroup}>

              <label className={styles.label}>
                Applicant Name
              </label>

              <input
                type="text"
                value={users?.username || ""}
                readOnly
                className={styles.inputField}
              />

            </div>

            <div className={styles.formGroup}>

              <label className={styles.label}>
                Position
              </label>

              <input
                type="text"
                value={selectedJob?.position || ""}
                readOnly
                className={styles.inputField}
              />

            </div>

          </div>

          <br />

          {/* COVER LETTER */}

          <div className={styles.formGroup}>

            <label className={styles.label}>
              Cover Letter
            </label>

            <textarea
              name="cover_letter"
              placeholder="Write something..."
              value={formData.cover_letter}
              onChange={handleChange}
              className={styles.textArea}
            />

          </div>

          <br />

          {/* RESUME */}
         {/* RESUME */}

<div className={styles.formGroup}>

  <label className={styles.label}>
    Upload Resume
  </label>

  {/* SHOW OLD RESUME */}

  {users?.resume && (

    <div className={styles.inputField}>

      <p className={styles.resumeText}>
        Resume already uploaded
      </p>

      <a
        href={`http://127.0.0.1:8000${users.resume}`}
        target="_blank"
        rel="noreferrer"
        className={styles.link}
      >
        View Resume
      </a>

      <p className={styles.smallText}>
        Upload a new resume only if you want to replace the old one.
      </p>

    </div>
  )}

  <input
    type="file"
    onChange={handleFileChange}
    className={styles.inputField}
  />

  <p className={styles.smallText}>
    PDF, DOC, DOCX allowed. Max file size 5MB.
  </p>

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

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={loading}
              >
                {
                  loading
                    ? "Applying..."
                    : "Apply Now"
                }
              </button>

            </div>

          </div>

        </form>

      </div>

    </div>
  );
}