import { useEffect, useState } from "react";
import styles from './Applications.module.css';

export default function Applications() {
  const [applications, setApplications,] = useState([]);

  useEffect(() => {
    const storedApplications =
      JSON.parse(localStorage.getItem("applications")) || [];

    setApplications(storedApplications);
   
  }, []);

  return (
    <div className={styles.applications}>
      
      {/* TOP FILTER BAR */}
      <div className={styles.topBar}>
        
        <div className={styles.statusButtons}>
          <button className={styles.active}>All Status</button>
          <button>Pending</button>
          <button>On-Hold</button>
          <button>Candidate</button>
        </div>

        <select className={styles.sortSelect}>
          <option>Newest</option>
          <option>Oldest</option>
        </select>
      </div>

      {/* TABLE */}
      <div className={styles.tableContainer}>
        
        {applications.length === 0 ? (
          
          <div className={styles.emptyBox}>
            <h2>No Applications Found</h2>
          </div>

        ) : (
          
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Application ID</th>
                <th>Position</th>
                
                <th>Company</th>
                <th>Type</th>
                <th>State</th>                
                <th>Contact</th>
                <th>Date Applied</th>
                 {/* <th>Status</th> */}
              </tr>
            </thead>

            <tbody>
              {applications.map((item, index) => (
                
                <tr key={item.applicationId || index}>
                  
                  <td>
                    <div
                      className={`${styles.checkBox} ${styles.activeCheck}`}
                    >
                      ✓
                    </div>
                  </td>

                  <td className={styles.orderId}>
                    #{item.applicationId || "000123456"}
                  </td>

                  <td className={styles.jobType}>
                    {item.type || "PART TIME"}
                  </td>

                 

                  <td>
                    <div className={styles.companyInfo}>
                      
                      <div className={styles.companyLogo}>
                        {item.companyName?.charAt(0) || "K"}
                      </div>

                      <span>
                        {item.companyName || "Kelon Team"}
                      </span>

                    </div>
                  </td>

                  

                  <td>
                    {item.jobTitle || "UI Researcher"}
                  </td>
                  <td>
                    {item.location || "USA"}
                  </td>

                  <td className={styles.contact}>
                    📞 {item.phone || "012 3123412"}
                  </td>

                   <td>
                    {item.appliedAt || "Nov 21th 2020 09:21 AM"}
                  </td>
                  {/* <td>
                    {item.status|| "pending"}
                  </td> */}

                </tr>
              ))}
            </tbody>
          </table>

        )}
      </div>
    </div>
  );
}