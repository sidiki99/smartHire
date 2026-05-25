import { Outlet } from "react-router-dom"

import Footer from "./Footer"
export default function Content() {
  return (
    <div  >
   
      <Outlet  
      />
      <Footer/>
   
      
    </div>
  )
}
