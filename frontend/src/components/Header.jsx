
import { useNavigate ,useLocation} from "react-router-dom"

import styles from "./Header.module.css"

export default function Header() {
  const navigate = useNavigate();
   const location = useLocation();

  const titles = {
    "/": "Dashboard",
    "/jobs": "Jobs",
    "/profile": "Profile",
    "/AddJobs": "Add Job",
    "/logout":"Logout"
  };

  const pageTitle = titles[location.pathname] || "Page";

  // Browser tab title
  document.title = pageTitle;
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <img src="https://i.pravatar.cc/48?u=499476" className={styles.logo} onClick={()=> navigate("/")}     />
        <h2 style={{color:"#D43109"}}>smartHire</h2>
        <span className={styles.subtitle}>{pageTitle}</span>
      </div>

      <div className={styles.search}>
        <input type="text" placeholder="Search..." />
      </div>

      <div className={styles.right}>
        
         <img src="/icons/add.png" alt="profile" className={styles.avatar} onClick={()=> navigate("/AddJobs")} />
          <img src="/icons/message-dots.png" alt="profile" className={styles.avatar} />
        <img src="/icons/user.png" alt="profile" className={styles.avatar}  onClick={()=> navigate("/login")} />
      </div>
    </header>
  )
}