// import React from 'react';
// import { useSelector } from 'react-redux';



// const PaymentButton = ({ amount,userId,bookingId }) => {

//   const handlePayment = async () => {
//     try {
//       // 1. Create order from backend
//       const res = await fetch('/payment/razor', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ amount, userId,bookingId }),
//       });

//       const data = await res.json();
//       if (!data.orderId) {
//         alert('Failed to create payment order');
//         return;
//       }

//       const options = {
//         key: data.razorpayKey,
//         amount: amount * 100, // Razorpay expects paise
//         currency: 'INR',
//         name: 'Book Ticket',
//         description: 'Ticket payment',
//         order_id: data.orderId,
//         handler: async function (response) {
//           // 2. Verify payment
//           const verifyRes = await fetch('/payments/verify-razorpay', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               paymentId: data.payment._id,
//             }),
//           });

//           const verifyData = await verifyRes.json();
//           if (verifyData.payment?.paymentStatus === 'success') {
//             alert('Payment successful & verified!');
//           } else {
//             alert('Payment verification failed!');
//           }
//         },
//         prefill: {
//           name: user.name || 'vijaykumar ',
//           email: user.email || 'bvkrk1994@gmail.com',
//           contact: user.contact || '8367002388',
//         },
//         theme: {
//           color: '#3399cc',
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error(error);
//       alert('Payment failed. Please try again.');
//     }
//   };

//   return (
//     <button
//       onClick={handlePayment}
//       className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
//     >
//       Pay ₹{amount}
//     </button>
//   );
// };

// export default PaymentButton;



import  { useEffect,useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams,useNavigate } from "react-router-dom";
import axios from './Axios'
import { statusUpdate } from "./BookingSlice";

const RazorpayCheckout = () => {
     const [mobileNumber, setMobileNumber] = useState("");
     const navigate=useNavigate()
     const dispatch=useDispatch()
    const {id}=useParams()
    const {data}=useSelector((state)=>{
        return state.user
    })
    const {bookingData}=useSelector((state)=>{
        return state.bookings
    })
    console.log(bookingData)
    const bookingObj=bookingData.find((ele)=>ele._id===id)
    console.log(bookingObj)
  useEffect(() => {
    // Dynamically load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      console.log("Razorpay script loaded successfully");
    };
    script.onerror = () => {
      console.error("Error loading Razorpay script");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup when component unmounts
    };
  }, []);

  const handlePayment = async () => {
     if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      return alert("Please enter a valid 10-digit mobile number");
    }
    try {
      const orderResponse = await axios.post(
        "/payment/razor",
        {
          amount: bookingObj.totalAmount,
          user: data._id,
          booking: bookingObj._id,
        },{headers:{Authorization:localStorage.getItem('token')}}  //{headers:{Authorization:localStorage.getItem('token')}}
      );

      const { orderId, razorpayKey, payment } = orderResponse.data;

      if (!orderId || !razorpayKey || !payment) {
        alert("Failed to create order");
        return;
      }

      const options = {
        key: razorpayKey,
        amount: bookingObj.totalAmount * 100,
        currency: "INR",
        name: "EventBooking",
        description: "EventBooking payment",
        order_id: orderId,
        handler: async function (response) {
          const verifyResponse = await axios.post(
            "/payments/verify-razorpay",
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              paymentId: payment._id,
            },{headers:{Authorization:localStorage.getItem('token')}}
          );
       



          const verifyResult = verifyResponse.data;
          if (verifyResponse.status === 200) {
            alert("Payment successful and verified!");
            console.log(bookingObj._id)
            dispatch(statusUpdate(id))
            navigate(`/ticket/${bookingObj._id}`)
            console.log(verifyResult);
          } else {
            alert("Payment verification failed");
            console.error(verifyResult);
          }
        },
        prefill: {
          name: data.name,
          email: data.email,
          contact: mobileNumber,
        },
        theme: {
          color: "#3399cc",
        },
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert("Razorpay script not loaded correctly.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong");
    }
  };

  return (
    // 
    <div className="p-4 max-w-lg mx-auto h-[500px] bg-white shadow rounded mt-9">
    
        <div>
      <h2 className="text-xl font-semibold mb-4">

        Pay ₹{bookingObj?.totalAmount.toLocaleString()} with Razorpay
      </h2>
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Mobile Number</label>
        <input
          type="tel"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          placeholder="Enter your mobile number"
        />
      </div>
      <div>
      <button
        onClick={handlePayment}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Pay Now
      </button>
      
      </div>
      <div className="mt-3">
      <button
        // onClick={()=>navigate('/dashboard')}
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
      >
        Cancel Pay
      </button>
      
      </div>
      {/* <div className='h-60 w-60 mb-10'>
        <img className='h-60 w-60' src='/src/assets/download (4).png' alt='millPayment' />
      </div> */}
    </div>
    
  

  );
};

export default RazorpayCheckout;