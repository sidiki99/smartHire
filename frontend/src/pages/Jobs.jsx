
import Spinner from '../components/Spinner'
import styles from './Jobs.module.css';
import { FiBell,
  FiBriefcase,
  FiClock,
  FiUsers,
  FiTrendingUp,
  FiDollarSign,
  FiMapPin,
  FiBookOpen,
  FiCalendar,
    FiUser } from 'react-icons/fi';

//import PropTypes from "prop-types";

export default function Jobs({jobs,isLoading,setOpenPopup,setSelectedJob,setJobs}) {
  
  if(isLoading) return <Spinner />

  const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this job?"
  );

  if (!confirmDelete) return;

  try {

    const res = await fetch(
      `http://127.0.0.1:8000/app/delete_job/${id}/`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {

      // REMOVE FROM UI
      setJobs((prevJobs) =>
        prevJobs.filter((job) => job.id !== id)
      );

      alert("Job deleted successfully");

    } else {

      alert("Failed to delete");

    }

  } catch (error) {

    console.log(error);

  }
};
   
  return (
    
    <main className={styles.mainContent } >
           {/* Top Header */}
           <header className={styles.topHeader}>
             <div className={styles.headerLeft}>
               <h2>Apply Job</h2>
             </div>
             <div className={styles.headerRight}>
               <FiBell  className={styles.icon} />
               <div className={styles.profile}>
                 <FiUser className={styles.icon} />
                 <span>Profile</span>
               </div>
               
             </div>
          </header>
            <div className={styles.container}>
                  {jobs.map((job) => (
                    <div key={job.id} className={styles.card}>

                        <h2 className={styles.title}>
                          {job.position}
                        </h2>

                    <div className={styles.infoGrid}>
                        
                        <div className={styles.infoItem}>
                          <FiBriefcase /> {job.companyName}
                        </div>

                        <div className={styles.infoItem}>
                          <FiClock /> {job.jobType}
                        </div>

                        <div className={styles.infoItem}>
                          <FiUsers /> {job.vacancy} vcnc/vcncies
                        </div>

                        <div className={styles.infoItem}>
                          <FiTrendingUp /> {job.experience} Exp.
                        </div>

                        <div className={styles.infoItem}>
                          <FiDollarSign /> {job.salaryFrom}$ - {job.salaryTo}$
                        </div>

                        <div className={styles.infoItem}>
                          <FiMapPin /> {job.city} in {job.state}
                        </div>

                        <div className={styles.infoItem}>
                          <FiBookOpen /> {job.education} Edu.
                        </div>

                        <div className={styles.infoItem}>
                          <FiCalendar /> Strt: {job.postedDate}
                        </div>

                        <div className={styles.infoItem}>
                          <FiCalendar /> End: {job.lastDate}
                        </div>

                      </div>
                       <div className={styles.bottomSection}>
                      <div className={styles.skills}>
                        <strong>Skills:</strong>

                             <ul>
                                {Array.isArray(job?.skills) &&
                                  job.skills.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                  ))}
                              </ul>
                     </div>
                     <br></br>
                     <strong>Note:</strong>
                     <p className={styles.description}>{job.description}</p>
                  </div>

                  <div className={styles.footer}>
                     <button
                        className={styles.delBtn}
                        onClick={() => handleDelete(job.id)}
                      >
                        Delete Job
                      </button>
                    <button className={styles.applyBtn} type="submit" onClick={() =>{ setOpenPopup(true) , setSelectedJob(job)}}
                    
                    >
                      Apply Now
                    </button>
                      
                  </div>

                </div>
              ))}
        </div>
    </main>

  )
}
