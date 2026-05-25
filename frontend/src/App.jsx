import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddJobs from "./pages/AddJobs"
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppNav from "./components/AppNav";
import styles from './App.module.css';
import Jobs from "./pages/Jobs";
import { useEffect, useState } from "react";
import ApplyJob from "./pages/ApplyJob";
import Applications from "./pages/Applications";
import { AuthProvider } from "./components/contracts/FakeAuthContext";
import CompanyForm from "./pages/AddCompany";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import PageNav from "./components/PageNav";




export default function App(){
  const BASE_URL = "http://127.0.0.1:8000/app";
  const [jobs,setJobs] =useState([]);
  const [users,setUsers] =useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [openPopup,setOpenPopup]= useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const currentUser = users?.[0] || null;
  
  
  
  useEffect(function(){
    async function fetchJobs(){
      try{
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/get_job/`,{
        credentials: "include"
        })
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }

         const data = await res.json();
         
        setJobs(data);
        

       console.log(document.cookie);
        const u_res = await fetch(`${BASE_URL}/user/`, {
            method: "GET",
            credentials: "include"
        });
        const u_data = await u_res.json();
        setUsers(u_data);

      }catch (error) {
          console.error("Error loading data:", error);
        }finally
      {
        setIsLoading(false)
      }
    }
      fetchJobs()

  },[])
  useEffect(() => {
  console.log("jobs updated:", jobs);
}, [jobs]);

  return(

    <div className={styles.body}>
      <AuthProvider> 
    
     
    <BrowserRouter>
     
  {openPopup && (
    <ApplyJob 
    setOpenPopup={setOpenPopup}
     selectedJob={selectedJob}
      currentUser={currentUser} />
  )}
    <Routes>
      <Route path="/" element={<AppNav />}>
        <Route index element={<Dashboard  
        isLoading={isLoading}
        
        users={users}/>} />
        <Route
          path="jobs"
          element={
            <Jobs
              jobs={jobs}
              isLoading={isLoading}
              setOpenPopup={setOpenPopup}
              setSelectedJob={setSelectedJob}
            />
          }
        />
        <Route path="AddJobs" element={<AddJobs/>} />
        <Route path="profile" element={<Profile />} />
        <Route path="logout" element={<Logout />} />
         <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="applications" element={<Applications 
        
        />} />
        <Route path="company" element={<CompanyForm      
        />} />
      </Route>
      <Route path="signup" element={<Signup />} />
      <Route path="signin" element={<Signin  />} />
     <Route path="pageNav" element={<PageNav users={users || null} />} />

    </Routes>
    </BrowserRouter>
    </AuthProvider>
    
    </div>
  )
}