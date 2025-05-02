import { useState } from "react"; 
import { isEmail } from 'validator';
import { useNavigate} from 'react-router-dom'; 
import axios from "./Axios"
export default function Register() {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [role, setRole] = useState(''); 
    const [clientErrors, setClientErrors] = useState({}); 
    const [serverErrors, setServerErrors] = useState(null); 
    const navigate = useNavigate(); 
    const handleSubmit = async (e) => { 
        e.preventDefault(); 
        const errors = {}; 

        if(email.trim().length === 0) {
            errors.email = 'email is required'; 
        } else if(!isEmail(email)) { // check email format
            errors.email = 'email is invalid'; 
        }

        if(password.trim().length === 0) {
            errors.password = 'password is required'; 
        } else if(password.trim().length < 8 || password.trim().length > 128) {
            errors.password = 'password should be between 8 to 128 characters'; 
        }
        if(Object.keys(errors).length > 0) {
            setClientErrors(errors); 
        } else {
            const formData = {
                email: email,
                password: password,
                role: role
            }
            try {
                const response = await axios.post('/register', formData)
                console.log(response.data); 
                navigate('/login'); 
            } catch(err) {
                setServerErrors(err.response.data.errors); 
                setClientErrors({}); 
            }
        }
    }
    return (
        <div className="App">
            <h2>Register with us</h2>
            { serverErrors && (
                <div>
                    <h3>These error/s prohibitted the form from being saved: </h3>
                    <ul>
                        { serverErrors.map((err, i) => {
                            return <li key={i}>{err.msg}</li>
                        })}
                    </ul>
                </div> 
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Enter email</label> <br />
                    <input 
                        type="text" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        id="email" 
                    />
                    { clientErrors.email && <p> { clientErrors.email } </p>}
                </div>
                <div>
                    <label htmlFor="password">Enter password</label> <br />
                    <input 
                        type="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        id="password"    
                    />
                    { clientErrors.password && <p> { clientErrors.password } </p>}
                </div>

                <div>
                    <label>Select role</label>
                    <input 
                        type="radio" 
                        id="moderator" 
                        name="role" 
                        checked={role === 'moderator'} 
                        onChange={() => { setRole("moderator")}} 
                    /> <label htmlFor="moderator"> Moderator</label>
                    <input 
                        type="radio" 
                        id="user" 
                        name="role" 
                        checked={role === 'user'} 
                        onChange={() => setRole("user")} 
                    /> <label htmlFor="user"> User</label>
                </div>
                <div>
                    <input type="submit" />
                </div>
            </form>
        </div>
    )
}