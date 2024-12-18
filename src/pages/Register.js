import {Form, Button} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';
import {useNavigate, Navigate} from 'react-router-dom';
import {Notyf} from 'notyf';
import UserContext from '../UserContext';

export default function Register(){

	const {user} = useContext(UserContext);

	const notyf = new Notyf();
	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [checkbox, setCheckbox] = useState(false);

	const [isActive, setIsActive] = useState(false);
	
	useEffect(()=>{
		if(name !== '' && email !== '' && password !== '' && confirmPassword !== '' && confirmPassword === password && checkbox !== false){
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	},[name, email, password, confirmPassword, checkbox]);

	const registerUser = event => {
		event.preventDefault();
		fetch(`https://fitnessapi-raquel.onrender.com/users/register`,{
			method: 'POST',
			headers: {
				"Content-Type": 'application/json'
			},
			body: JSON.stringify({
				name,
				email,
				password
			})
		})
		.then(response => response.json())
		.then(data => {
			if (data.message === 'Registered Successfully'){
				setName('');
				setEmail('');
				setPassword('');
				setConfirmPassword('');
				setCheckbox(false);

				notyf.success("Registration Sucessful!");
				navigate('/login');
			} else if (data.message === 'Invalid email format!') {
				notyf.error("Invalid email format!");
			} else if (data.message === "password must be at least 8 characters"){
				notyf.error("password must be at least 8 characters");
			} else if (data.message === 'User account is already existing') {
				notyf.error("User account is already existing!");
			} else {
				notyf.error("Something Went Wrong! Contact the IT admin.");
			}
		})
	}

	return(
		<>
		{user.id !== null ?
			<Navigate to= "/login" />
			:
			<Form className="col-12 col-md-6 mt-5 shadow p-5 rounded-5 mx-auto" onSubmit={event => registerUser(event)}>
				<h1 className="text-center"> Register </h1>

				<Form.Group className="mb-3" controlId="name">
			       <Form.Label>Name</Form.Label>
			       <Form.Control 
			       		type="text" 
			       		placeholder="Enter your full name" 
			       		value = {name}
			       		onChange = {event => setName(event.target.value)}
			       		required
			       		/>
			     </Form.Group>
			     <Form.Group className="mb-3" controlId="formBasicEmail">
			       <Form.Label>Email address</Form.Label>
			       <Form.Control 
			       	type="email"
			        placeholder="Enter email" 
			        value = {email}
			        onChange = {event => setEmail(event.target.value)}
			        required
			        />
			       <Form.Text className="text-muted">
			         We'll never share your email with anyone else.
			       </Form.Text>
			     </Form.Group>

			     <Form.Group className="mb-3" controlId="formBasicPassword">
			       <Form.Label>Password</Form.Label>
			       <Form.Control 
			       		type="password" 
			       		placeholder="Enter at least 8 characters" 
			       		value = {password}
			       		onChange = {event => setPassword(event.target.value)}
			       		required
			       		/>
			     </Form.Group>

			     <Form.Group className="mb-3" controlId="formConfirmPassword">
			       <Form.Label>Confirm Password</Form.Label>
			       <Form.Control 
			       type="password" 
			       placeholder="Retype your password"
			       value = {confirmPassword}
			       onChange = {event => setConfirmPassword(event.target.value)}
			      />
			     </Form.Group>

			     <Form.Group className="mb-3" controlId="formBasicCheckbox">
			       <Form.Check 
			       type="checkbox"
			       value={checkbox}
			       onChange={event => setCheckbox(event.target.checked)}
			       label="I agree to abide in the terms and conditions of this site as I register as a user." />
			     </Form.Group>

			     {isActive ? 
			     <Button className="btn-md" variant="primary" type="submit">
			       Register
			     </Button>
			     :
			     <Button className="btn-md" variant="danger" type="submit" disabled>
			       Fill out all the fields
			     </Button>
			 	}
			   </Form>
		}
		</>
		)
}