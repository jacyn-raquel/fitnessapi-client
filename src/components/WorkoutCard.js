import {Card, Row, Col} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';

export default function WorkoutCard({workout, getWorkouts}){

	useEffect(()=>{
		console.log(workout);
	},[])

	return(
		<>
		
			<Card className="mb-3 col-6 offset-md-3">
		      <Card.Body className="text-center">
		       <Card.Title >{workout.name}</Card.Title>
		        <Card.Text>
			         Duration: {workout.duration}
		        </Card.Text>
		        <Card.Text>
			         Status: {workout.status}
		        </Card.Text>
		      </Card.Body>
		    </Card>
			
			
			
		</>


		)
}