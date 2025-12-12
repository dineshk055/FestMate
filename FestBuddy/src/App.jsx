import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import HelperRegister from "./pages/helper_files/HelperRegister";
import HelperList from "./pages/HelperList";
import HostRegister from "./pages/host_files/HostRegister";
import EventsList from "./pages/Events";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/UserProvider";



const App =()=>{
  return(
    <>

    <UserProvider>


    <Navbar/>

    <Toaster position="top-center" toastOptions={{duration: 2000,
    style: {
      background: "#1f2937",   // gray-800
      color: "white",
      borderRadius: "12px",
      padding: "12px 16px",
      fontSize: "14px",
      border: "1px solid #374151", // gray-700
    }
  }} />
  
    <Routes>
      <Route  path='/' element={<Home/>}/>
      <Route  path='/SignIn' element={<SignInPage/>}/>
      <Route  path='/SignUp' element={<SignUpPage/>}/>
      <Route  path='/HelperRegister' element={<HelperRegister/>}/>
      <Route  path='/Helperlist' element={<HelperList/>}/>
      <Route  path='/Hostregister' element={<HostRegister/>}/>
      <Route  path='/Eventspage' element={<EventsList/>}/>

    </Routes>

    </UserProvider>
    
    </>
  )
}
export default App;