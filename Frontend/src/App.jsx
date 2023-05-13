import { useEffect, useState } from 'react';
import './App.css';
import { Routes , Route , Link ,useNavigate, useLocation} from 'react-router-dom' ;
import { About } from './Components/About';
import { Home } from './Components/Home';
import { Phone } from './Components/Phone';
import { ProtectedRoute } from './Components/ProtectedRoute';
import API from './url';
import Signup from './Components/Signup/Signup.jsx';
import Login from './Components/LoginFolder/LoginFile.jsx';
import { Emailverify } from './Components/mailverification/Emailverify';
import Header from './Components/Header';
import { ResetPassword } from './Components/resetPassword/ResetPassword';
import { ResetPassPage } from './Components/ResetPassPage/ResetPassPage';

function App() {
  const [mobile , setMobile] = useState([]);
  const navigate=useNavigate();
  const location =useLocation();

  //!to get all mobiles funciton
 function getAllMobiles() {
    fetch(`${API}/mobiles`, {
      method: "GET",
      headers: {
        'x-Auth-token': localStorage.getItem("x-Auth-token"),
        'roleId':localStorage.getItem("roleId")
      }
    })
      .then((response) => {
        if (response.status === 401) {
          throw new Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then((mbs) => setMobile(mbs))
      .catch((err) => {
        console.log(location.pathname.slice(0,12));
        if(location.pathname.slice(0,12) == "/emailverify"){
          setTimeout(() => {
            navigate("/login");
          }, 5000);
        }else if(location.pathname.slice(0,12) ==='/resetPassPa'){
            
        }else{
          navigate("/login")
        }
        localStorage.removeItem("x-Auth-token");
      });
  }
  

  useEffect(() => {
    getAllMobiles();
  }, []);

  const handleLogout = () =>{
    localStorage.clear();
    navigate("/login");
  }
  console.log(location.pathname !== "/emailverify/:id");
  return (
    <div className="App">
      {location.pathname.slice(0,12) !== "/emailverify"?<Header handleLogoutFn={handleLogout}/>:<></>}
      <Routes>
        <Route path="/" element={<Home getAllMobilesFn={()=>getAllMobiles()}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login getAllMobilesFn={()=>getAllMobiles()}/>} />
        <Route path="/emailverify/:id" element={<Emailverify />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/resetPassPage/:string" element={<ResetPassPage />} />
        <Route
          path="/mobile"
          element={
            <ProtectedRoute>
              <Phone data={mobile} getAllMobilesFn={()=>getAllMobiles()}/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
export { App } 




