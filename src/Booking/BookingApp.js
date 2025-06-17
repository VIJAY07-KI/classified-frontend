
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./forgotPassword"
import Account from "./Account";
import Event from "./Event";
import EventForm from "./EventForm";
import EventBooking from "./EventBooking";
import Booking from "./Booking";
import BookingForm from "./BookingForm";
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import RazorpayCheckout from "./payment"
import TicketView from "./TicketView";
import PrivateRoute from "./PrivateRoute";
import ProtectedRoute from "./ProtectedRoute";
import UnAuthorized from "./UnAuthorized";
import UserList from "./UserList";
import ActivateUsers from "./ActivateUsers";
import ApproveEvents from "./ApproveEvents";
import { logout, fetchUserAccount } from "./UserSlice";
import logo from "../assets/logo.png"
import HomePage from "./home"

export default function BookingApp() {
  const { isLoggedIn, data } = useSelector((state) => {
    return state.user;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
    useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(fetchUserAccount());
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
     <nav className=" fixed top-0 left-0 w-full z-50 bg-white text-black  flex items-center justify-between p-2">
  
  <div>
    <Link to="/" className="text-xl font-bold text-red-700">
     <img
      src={logo}
      alt="KV Event Booking"
      className="h-12 w-auto object-contain scale-150"   /* tailwind: 40 px tall, keeps aspect ratio */
    />
    </Link>
  </div>

  
  <div className="flex gap-4 items-center">
    {!isLoggedIn ? (
      <>
        <Link
          to="/login"
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
        >
          Register
        </Link>
      </>
    ) : (
      <>
        <Link
          to="/account"
          className="text-blue-600 hover:text-blue-800 font-medium transition"
        >
          Account
        </Link>
        <Link
          to="/event"
          className="text-blue-600 hover:text-blue-800 font-medium transition"
        >
          Events
        </Link>
        
        <Link
          to="/booking"
          className="text-blue-600 hover:text-blue-800 font-medium transition"
        >
          Bookings
        </Link>
        <Link
          to="/eventbooking"
          className="text-blue-600 hover:text-blue-800 font-medium transition"
        >
          Event-Booking
        </Link>
        {data.role==="admin"&&(
        <Link
          to="/userlist"
          className="text-blue-600 hover:text-blue-800 font-medium transition"
        >
          Users
        </Link>)}
        <Link
          to="/review"
          className="text-blue-600 hover:text-blue-800 font-medium transition"
        >
          Reviews
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
        >
          Logout
        </button>
      </>
    )}
  </div>
</nav>


      <div className="p-4 ">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<UnAuthorized />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
          <Route path="/event" element={<PrivateRoute><Event /></PrivateRoute>} />
          <Route path="/eventform" element={<EventForm />} />
          <Route path="/booking" element={<PrivateRoute><Booking /></PrivateRoute>} />
          <Route path="/bookingform/:id" element={<BookingForm/>} />
          <Route path="/eventbooking" element={<PrivateRoute><EventBooking/></PrivateRoute>} />
          <Route path="/reviewform" element={<ReviewForm/>} />
          <Route path="/review/:id" element={<Review/>} />
          <Route path="/payment/:id" element={<RazorpayCheckout/>} />
          <Route path="/ticket/:id" element={<TicketView/>} />
          <Route path="/privateroute" element={<PrivateRoute />} />
          <Route path="/protectedroute" element={<ProtectedRoute />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/activateusers" element={< ActivateUsers/>} />
          <Route path="/approveevents" element={<ApproveEvents />} />
          <Route path="/forgot-password" element={<ForgotPassword/>}/>

        </Routes>
      </div>
    </div>
  );
}
