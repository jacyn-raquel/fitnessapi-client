import {Container, Navbar, Nav} from 'react-bootstrap';
import UserContext from '../UserContext';
import {useState, useContext} from 'react';
import {NavLink} from 'react-router-dom';


export default function AppNavBar(){

	const {user} = useContext(UserContext);

	return(
		<Navbar expand="lg" className="bg-body-tertiary">
		      <Container>
		        <Navbar.Brand as={NavLink} to="/">
		                    Zuitt Tracker
              	</Navbar.Brand>
		        <Navbar.Toggle aria-controls="basic-navbar-nav" />
		        <Navbar.Collapse id="basic-navbar-nav">
		          <Nav className="ms-auto">
		            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
		            {(user.id === null) ?
		            	<>
		            	<Nav.Link as={NavLink} to="/register" exact="true">Register</Nav.Link>
		            	<Nav.Link as={NavLink} to="/login" exact="true">Login</Nav.Link>
		            	</>
		            	:
		            	<>
		            	<Nav.Link as={NavLink} to="/addWorkout" exact="true">Add Workout</Nav.Link>
		            	<Nav.Link as={NavLink} to="/workouts" exact="true">Workouts</Nav.Link>
		            	<Nav.Link as={NavLink} to="/logout" exact="true">Logout</Nav.Link>
		            	</>
		        	}
		            
		          </Nav>
		        </Navbar.Collapse>
		      </Container>
		    </Navbar>

		)
}