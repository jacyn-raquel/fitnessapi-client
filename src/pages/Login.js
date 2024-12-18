import {Form, Button} from 'react-bootstrap';
import {useState, useContext, useEffect} from 'react';
import {useNavigate, Navigate, Link} from 'react-router-dom';
import {Notyf} from 'notyf';
import UserContext from '../UserContext';

export default function Login(){

	const notyf = new Notyf();
	const navigate = useNavigate();

	const {user, setUser} = useContext(UserContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [checkbox, setCheckbox] = useState(false);
	
	const [isActive, setIsActive] = useState(false);
	

	function retrieveUserDetails
	(token) {
		fetch(`https://fitnessapi-raquel.onrender.com/users/details`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(res => res.json())
		.then(data => {
			setUser({
				id: data._id,
				isAdmin: data.isAdmin
			})
		})
	}

	function authenticate(event) {
		event.preventDefault();
		fetch(`https://fitnessapi-raquel.onrender.com/users/login`,{
			method:"POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email,
				password
			})
		})
		.then(res => res.json())
		.then(data => {
			if(data.access) {
				localStorage.setItem('token', data.access);

				retrieveUserDetails(data.access);

				setEmail('');
				setPassword('');

				notyf.success('Successful login!');

				navigate('/workouts');
			} else if (data.message === "No account found"){
				notyf.error('No account found. Register first.');
			}

		})
	}

	useEffect(()=> {
		if(email !== '' && password !== '' && checkbox !== false){
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [email, password, checkbox]);

	return(
		<>
		 {user.id !== null ?
		 	<Navigate to="/workouts" />
		 	:
			<Form className="col-12 col-md-6 mt-5 shadow p-5 rounded-5 mx-auto" onSubmit={event => authenticate(event)}>
				<h1 className="text-center"> Login </h1>
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
			       		placeholder="Password" 
			       		value = {password}
			       		onChange = {event => setPassword(event.target.value)}
			       		required
			       		/>
			     </Form.Group>

			     <Form.Group className="mb-3" controlId="formBasicCheckbox">
			       <Form.Check
			       type="checkbox"
			       value = {checkbox}
			       onChange = {event => setCheckbox(event.target.checked)}
			       label="I agree to abide in the terms and conditions of this site as I login as a user." />
			     </Form.Group>

			     {isActive ? 
			     <Button className="btn-md mx-auto" variant="primary" type="submit">
			      	Login
			     </Button>
			     :
			     <Button className="btn-md" variant="danger" type="submit" disabled>
			       Fill out all the fields
			     </Button>

			 	}
			 	<p className="text-center mt-4">Don't have an account yet? <a href="/register">Create an account.</a></p>
			     
			   </Form>
		 }
		</>
		)
}