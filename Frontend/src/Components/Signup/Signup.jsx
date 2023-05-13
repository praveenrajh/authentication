import { useState } from "react";
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./signup.css";
import API from '../../url.js';

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		emailVerified:"no",
		password: "",
		roleId:"0"
	});
	const [state, setState] = useState("Signup");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		setState("Loading...")
		e.preventDefault();
		fetch(`${API}/users/signup`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
			  "Content-Type": "application/json",
			},
		  })
		  .then((response)=>{
			if(response.status === 401){
				throw new Error(response.statusText)
			}else{
				setState("success")
				return response.json();
			}
		  })
		  .then((data) => {
			console.log(data);
			if(data.message =='already exist'){
				toast('already exist')
			}else if(data.message == 'password must be at least 8 characters'){
				toast('password must be 8 characters exist')
			}else{
				toast("Check your email and click the link to verify your E-Mail address")
				// localStorage.setItem("x-Auth-token", data.token);
				// localStorage.setItem("roleId", data.roleId);
				// getAllMobilesFn();
				navigate('/login')
			}
		  })
		  .catch((err)=>{
			console.log(err);
			setState("Error")
		  })
	

	};

	return (
		<div className='signup_container'>
			<div className='signup_form_container'>
				<div className='right'>
					<h1>Welcome Back</h1>
					<Link to="/login"> 
						<button type="button" className='white_btn'>
							Sign in
						</button>
					</Link>
				</div>
				<div className='left'>
					<form className='form_container' onSubmit={handleSubmit}>
						<h1 style={{color:"black"}}>Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className='input'
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className='input'
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className='input'
						/>
						<input
							type="text"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							minLength='8'
							required
							className='input'
						/>
						{/* {error && <div className='error_msg'>{error}</div>} */}
						<button type="submit" className='green_btn'>
							{state}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;