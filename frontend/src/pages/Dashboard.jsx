import { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';

export default function Dashboard({ users, isLoading, }) {
  const [countApplication,setCountApplication]=useState(0);
  useEffect(() => {
      const storedApplications =
        JSON.parse(localStorage.getItem("applications")) || [];
  
      
      setCountApplication(storedApplications.length)
    }, []);
console.log(users);
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className={styles.container}>

      {/* LEFT SECTION */}
      <div className={styles.leftCol}>

        <div className={styles.statsGrid}>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span className={styles.statValue}>342</span>
              <span className={styles.badge}>+0.5%</span>
            </div>
            <div className={styles.statLabel}>
              Interview Schedules
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span className={styles.statValue}>{countApplication}</span>
            </div>
            <div className={styles.statLabel}>
              Application Sent
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span className={styles.statValue}>1,567k</span>

              <span className={`${styles.badge} ${styles.badgeNegative}`}>
                -2.0%
              </span>
            </div>

            <div className={styles.statLabel}>
              Profile Viewed
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span className={styles.statValue}>437</span>
            </div>

            <div className={styles.statLabel}>
              Unread Messages
            </div>
          </div>

        </div>
      </div>




    <div className={styles.p_container}>
      <div className={styles.profileCard}>
        

        {/* LEFT SIDE */}
        {/* {users.slice(0, 1).map((user) => (
          <div key={user.id} className={styles.topSection}>

            <img
              src={user.image}
              alt="profile"
              className={styles.avatar}
            />

            <div className={styles.info}>
              <h2 className={styles.name}>{user.name}</h2>
              <p className={styles.role}>{user.role}</p>
              <p className={styles.location}>📍 {user.location} </p>

              <button className={styles.updateBtn}>
                Update Profile
              </button>
            </div>

          </div>
        ))} */}

        {/* Skill SIDE */}
        {/* {users.slice(0, 1).map((user) => (
          <div key={user.id} className={styles.skillsSection}>

           

            <div className={styles.skillsList}>
               <h3 className={styles.title}>Skills</h3>
              {user.skills.map((skill, index) => (
                <div key={index} className={styles.skillRow}>
                  <span>{skill}</span>
                  <span>{skill.value}%</span>
                  

                  <div className={styles.bar}>
                    <div
                      className={styles.fill}
                      //style={{ width: `${skill.value}%` }}
                       style={{ width: "70%" }}
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))} */}
   




 {/* LEFT SIDE */}
        {users && (
  <div className={styles.topSection}>

    <img
      src="https://i.pravatar.cc/150?img=3"
      alt="profile"
      className={styles.avatar}
    />

    <div className={styles.info}>

      <h2 className={styles.name}>
        {users.username}
      </h2>

      <p className={styles.role}>
        {users.email}
      </p>

      <button className={styles.updateBtn}>
        Update Profile
      </button>

    </div>

  </div>
)}
        {/* Skill SIDE */}
        {/* {users.slice(0, 1).map((user) => (
          <div key={user.id} className={styles.skillsSection}>

           

            <div className={styles.skillsList}>
               <h3 className={styles.title}>Skills</h3>
              {user.skills.map((skill, index) => (
                <div key={index} className={styles.skillRow}>
                  <span>{skill}</span>
                  <span>{skill.value}%</span>
                  

                  <div className={styles.bar}>
                    <div
                      className={styles.fill}
                      //style={{ width: `${skill.value}%` }}
                       style={{ width: "70%" }}
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))} */}


      </div>
    </div>
 


      
      </div>
   

     )}