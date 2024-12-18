import { Form, Button, Row, Col } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { Notyf } from 'notyf';
import UserContext from '../UserContext';
import {Link} from 'react-router-dom';

export default function AddWorkout({ onAddWorkout }) {
  const { user } = useContext(UserContext);
  const notyf = new Notyf();

  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');

  const handleAddWorkout = (event) => {
    event.preventDefault();

    let token = localStorage.getItem('token');
    fetch(`https://fitnessapi-raquel.onrender.com/workouts/addWorkout`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: user.id,
        name,
        duration,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setName('');
          setDuration('');
          notyf.success('Workout Added Successfully!');

          // Call the callback to update Workout.js state
          if (onAddWorkout) {
            onAddWorkout(data);
          }
        } else {
          notyf.error('Error: Something went wrong! Contact IT Support.');
        }
      });
  };

  return (
    <Form className="mt-5 shadow rounded-4 p-5" onSubmit={handleAddWorkout}>
      <h1 className="text-center">Add Workout</h1>
      <Form.Group className="mb-3" controlId="nameOfWorkout">
        <Form.Label>Name of Workout</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="durationOfWorkout">
        <Form.Label>Duration</Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g., 1hr"
          value={duration}
          onChange={(event) => setDuration(event.target.value)}
        />
      </Form.Group>

      <Row>
      	<Col className="col-md-6 offset-md-4">
		      <Button className="me-4" variant="success" type="submit">
		        Add Workout
		      </Button>
		      <Button as={Link} variant="danger" to="/workouts">
		      Cancel
		      </Button>
      	</Col>
      </Row>
    </Form>
  );
}
