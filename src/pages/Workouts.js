import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import { Navigate, useNavigate } from 'react-router-dom';
import WorkoutCard from '../components/WorkoutCard';

export default function Workouts() {
  const { user } = useContext(UserContext);
  const [workouts, setWorkouts] = useState([]);

  const navigate = useNavigate();

  const getWorkouts = () => {
    fetch(`https://fitnessapi-raquel.onrender.com/workouts/getMyWorkouts`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Workouts Data:", data); // Debugging
        if (Array.isArray(data)) {
          setWorkouts(data);
        } else if (data.workouts && Array.isArray(data.workouts)) {
          setWorkouts(data.workouts);
        } else {
          setWorkouts([]);
          console.error("Unexpected API response:", data);
        }
      })
      .catch((error) => console.log('Error fetching workouts:', error));
  };

  useEffect(() => {

  	const token = localStorage.getItem('token');
  	if (token) {
  	  getWorkouts();
  	} else {
  	  navigate('/login');
  	}


  }, [user]);

  return (

    user.id !== null ?
    	<Container className="mt-5">
    	  <Row>
    	    <Col>
    	      <h1 className="text-center mb-3">My Workouts</h1>

    	        {workouts.map((workout) => {
    	          return (
    	            <WorkoutCard
    	              key={workout._id}
    	              workout={workout} 
    	              getWorkouts={getWorkouts}
    	            />
    	          )
    	        })}

    	    </Col>
    	  </Row>
    	</Container>
      :
      <Navigate to="/"/>
  )
}
