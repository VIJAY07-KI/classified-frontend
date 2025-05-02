import {  Route, Routes, Link,useNavigate } from "react-router-dom";
// import '../index.css'; // From index.js
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import Register from "./Register";
import Login from "./Login";
import Account from "./Account";
import DashBoard from "./DashBoard";
import { logout,fetchUserAccount } from "./UserSlice";
import PrivateRoute from "./PrivateRoute";
import ProtectedRoute from "./ProtectedRoute";
import UnAuthorized from "./UnAuthorized";
import MyRecipe from "./Myrecipe";
import AllRecipes from "./All-recipes";
export default function RecApp() {
   const {isLoggedIn,data}=useSelector((state)=>{
     return state.user
   })
   console.log(isLoggedIn)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    useEffect(()=>{
        if(localStorage.getItem('token')){
            dispatch(fetchUserAccount())
        }
    },[dispatch])
    return (
    
            <div>
                <div>
                    {console.log(isLoggedIn)}
                    {isLoggedIn?(<><Link to="/account">Account</Link> <br /> <Link to="/dashboard">DashBoard</Link> <br /> 
                    {data.role==='user'&&<Link to="/myrecipe">MyRecipe</Link> }<br />
                     <Link to="/allrecipes">AllRecipes</Link> <br /> <button onClick={()=>{dispatch(logout())
                    localStorage.removeItem('token')
                         navigate('/login')}}>Logout</button></>):(<><Link to="/register">Register</Link> <br />
                        <Link to="/login">Login</Link> <br /></>)}
                    
                    
                </div>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
                    <Route path='/dashboard' element={<PrivateRoute><DashBoard /></PrivateRoute>} />
                    <Route path='/myrecipe' element={<PrivateRoute><ProtectedRoute roles={['user']}><MyRecipe /></ProtectedRoute></PrivateRoute>} />
                    <Route path='/allrecipes' element={<PrivateRoute><AllRecipes /></PrivateRoute>} />
                    <Route path='/unauthorised'element={<UnAuthorized />} />
                </Routes>
            </div>
        
    );
}


// import {  Route, Routes, Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useDispatch,useEffect } from "react-redux";
// import '../index.css'; // From index.js

// import Register from "./Register";
// import Login from "./Login";
// import Account from "./Account";
// import DashBoard from "./DashBoard";
// // import PrivateRoute from "./PrivateRoute";


// export default function RecApp() {
//     const {isLoggedIn}=useSelector((state)=>{
//         return state.user
//     })
//     const dispatch=useDispatch()
//     const navigate=useNavigate()
//     useEffect(()=>{
//         if(localStorage.getItem('token')){
//             dispatch(fetchUserAccount())
//         }
//     },[])
//     return (
        
//             <div>
//                 <div>
//                     <Link to="/register">Register</Link> <br />
//                     <Link to="/login">Login</Link> <br />
//                     <Link to="/account">Account</Link> <br/>
//                     <Link to="/dashboard">DashBoard</Link>
//                 </div>
//                 <Routes>
//                     <Route path="/register" element={<Register />} />
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/account" element={<Account />} />
//                     <Route path="/dashboard" element={<DashBoard/>}/>
//                 </Routes>
//             </div>
    
//     );
// }
