import { useState } from "react"; 
import { isEmail } from 'validator';
import { useNavigate } from 'react-router-dom'; 
import axios from "./Axios";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [role, setRole] = useState(''); 
    const [clientErrors, setClientErrors] = useState({}); 
    const [serverErrors, setServerErrors] = useState(null); 
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => { 
        e.preventDefault(); 
        const errors = {}; 

        if (email.trim().length === 0) {
            errors.email = 'Email is required'; 
        } else if (!isEmail(email)) {
            errors.email = 'Email is invalid'; 
        }

        if (password.trim().length === 0) {
            errors.password = 'Password is required'; 
        } else if (password.trim().length < 8 || password.trim().length > 128) {
            errors.password = 'Password should be between 8 to 128 characters'; 
        }

        if (name.trim().length === 0) {
            errors.name = 'Name is required';
        }

        if (!role) {
            errors.role = 'Please select a role';
        }

        if (Object.keys(errors).length > 0) {
            setClientErrors(errors); 
        } else {
            const formData = { name, email, password, role };
            try {
                const response = await axios.post('/register', formData);
                console.log(response.data); 
                navigate('/login'); 
            } catch (err) {
                setServerErrors(err.response.data.error); 
                setClientErrors({}); 
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Register</h2>

                {serverErrors && (
                    <div className="text-red-600 mb-4">
                        <h3 className="font-semibold">These error(s) prevented the form from being saved:</h3>
                        <ul className="list-disc pl-5 mt-2 text-sm">
                            {serverErrors.map((err, i) => (
                                <li key={i}>{err.msg}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block mb-1 font-medium">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                        {clientErrors.name && <p className="text-sm text-red-500 mt-1">{clientErrors.name}</p>}
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                        {clientErrors.email && <p className="text-sm text-red-500 mt-1">{clientErrors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-1 font-medium">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                        {clientErrors.password && <p className="text-sm text-red-500 mt-1">{clientErrors.password}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Role</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    id="buyer"
                                    name="role"
                                    checked={role === 'buyer'}
                                    onChange={() => setRole("buyer")}
                                    className="accent-blue-600"
                                />
                                Buyer
                            </label>
                            <label className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    id="seller"
                                    name="role"
                                    checked={role === 'seller'}
                                    onChange={() => setRole("seller")}
                                    className="accent-blue-600"
                                />
                                Seller
                            </label>
                        </div>
                        {clientErrors.role && <p className="text-sm text-red-500 mt-1">{clientErrors.role}</p>}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
