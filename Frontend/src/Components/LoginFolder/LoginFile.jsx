import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./LoginFile.css";
import API from '../../url'

const Login = ({ getAllMobilesFn}) => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState(false);
	const [state, setState] = useState("Login")
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {1
		setData({ ...data, [input.name]: input.value });
	};
 
	const handleSubmit = async (e) => {
		e.preventDefault();
		setState("Loading...")
		fetch(`${API}/users/login`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
			  "Content-Type": "application/json",
			},
		  })
		  .then((response)=>{
			if(response.status === 401){
				toast("invalid Creadentials")
				throw new Error(response.statusText)
			}else if(response.status === 405){
				setError(true);
				setTimeout(() => {
					setError(false)
				}, 5000);
			}else{
				setState("success")
				return response.json();
			}
		  })
		  .then((data) => {
			localStorage.setItem("x-Auth-token", data.token);
			localStorage.setItem("roleId", data.roleId);
			getAllMobilesFn();
			navigate('/mobile')
			toast("successfully logged in")
		  })
		  .catch((err)=>{
			setState("Error")
			console.log(err);
		  })
	};

	return (
		<div className='login_container'>
			<div className='login_form_container'>
				<div className='left'>
					<form className='form_container' onSubmit={handleSubmit}>
						<h1 style={{color:"black"}}>Login to Your Account</h1>
						<input
							type="email"
							placeholder="email"
							name="email"
							onChange={handleChange}
							value={data.username}
							required
							className='input'
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className='input'
						/>
						{error &&<div className='error_msg'>Verification link is sended to your mail. Click that before Login</div>}
						<Link to='/resetPassword'>Forget password?</Link>
						<button type="submit" className='green_btn'>
							{state}
						</button>
					</form>
				</div>
				<div className='right'>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className='white_btn'>
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;



