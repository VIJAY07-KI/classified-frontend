import { useState } from "react"; 
import { isEmail } from 'validator';
import { useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux'
import { login } from "./UserSlice";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [clientErrors, setClientErrors] = useState({}); 
    const [serverErrors, setServerErrors] = useState(null); 
    const navigate = useNavigate(); 
    const dispatch = useDispatch();

    const handleSubmit = async (e) => { 
        e.preventDefault(); 
        const errors = {}; 

        if(email.trim().length === 0) {
            errors.email = 'Email is required'; 
        } else if(!isEmail(email)) {
            errors.email = 'Email is invalid'; 
        }

        if(password.trim().length === 0) {
            errors.password = 'Password is required'; 
        } else if(password.trim().length < 8 || password.trim().length > 128) {
            errors.password = 'Password should be between 8 to 128 characters'; 
        }

        if(Object.keys(errors).length > 0) {
            setClientErrors(errors); 
        } else {
            const formData = { email, password };
            try {
                const response = await axios.post('http://localhost:3046/login', formData);
                localStorage.setItem('token', response.data.token);
                const userResponse = await axios.get('http://localhost:3046/account', {
                    headers: { Authorization: localStorage.getItem('token') }
                });
                dispatch(login(userResponse.data));
                navigate('/account'); 
            } catch(err) {
                setServerErrors(err.response?.data?.error || "Something went wrong"); 
                setClientErrors({}); 
            }
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Login</h2>

                {serverErrors && (
                    <div className="mb-4 text-red-600 text-center">
                        <p>{serverErrors}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block font-medium mb-1">Email</label>
                        <input 
                            type="text"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            id="email"
                            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {clientErrors.email && (
                            <p className="text-sm text-red-500 mt-1">{clientErrors.email}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block font-medium mb-1">Password</label>
                        <input 
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            id="password"
                            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {clientErrors.password && (
                            <p className="text-sm text-red-500 mt-1">{clientErrors.password}</p>
                        )}
                    </div>

                    <div>
                        <button 
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
