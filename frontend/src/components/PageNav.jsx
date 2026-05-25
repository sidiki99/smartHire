import { Link } from "react-router-dom"
import styles from "./PageNav.module.css"

export default function PageNav({users}) {
  return (
    <nav className={styles.sidebar}>
      <ul>
        <li>
          <Link to="/">
            <span className={styles.icon}>
              <img src="/icons/dashboard.png" alt="profile" />
            </span>
            <span>Dashboard</span>
            <span className={styles.arrow}>›</span>
          </Link>
        </li>

        <li>
          <Link to="/jobs">
            <span className={styles.icon}>
              <img src="/icons/job-offer.png" alt="profile" />
            </span>
            <span> Jobs</span>
            <span className={styles.arrow}>›</span>
            
          </Link>
        </li>

        <li>
          <Link to="/AddJobs">
            <span className={styles.icon}>
              <img src="/icons/job-offer.png" alt="profile" />
            </span>
            <span> Add Jobs</span>
            <span className={styles.arrow}>›</span>
            
          </Link>
        </li>
        <li>
          <Link to="/company">
            <span className={styles.icon}>
              <img src="/icons/job-offer.png" alt="profile" />
            </span>
            <span> Add Company</span>
            <span className={styles.arrow}>›</span>
            
          </Link>
        </li>

        <li>
          <Link to="/applications">
            <span className={styles.icon}>
              <img src="/icons/logout.png" alt="profile" />
            </span>
            <span>My Applications</span>
            <span className={styles.arrow}>›</span>
          </Link>
        </li>

        <li>
          <Link to="/profile">
            <span className={styles.icon}>
              <img src="/icons/user.png" alt="profile" />
            </span>
            <span>Profile</span>
            <span className={styles.arrow}>›</span>
          </Link>
        </li>

        

        

       

        <li>
          <Link to="/logout">
            <span className={styles.icon}>
              <img src="/icons/logout.png" alt="profile" />
            </span>
            <span>Logout</span>
            <span className={styles.arrow}>›</span>
          </Link>
        </li>
        {!users && (
        <li>
          <Link to="/signup">
            <span className={styles.icon}>
              <img src="/icons/logout.png" alt="profile" />
            </span>
            <span>Signup</span>
            <span className={styles.arrow}>›</span>
          </Link>
        </li>
        )}
      
          <li>
          <Link to="/signin">
            <span className={styles.icon}>
              <img src="/icons/logout.png" alt="profile" />
            </span>
            <span>Signin</span>
            <span className={styles.arrow}>›</span>
          </Link>
        </li>
        


       

       
          
      </ul>
    </nav>
  )
}