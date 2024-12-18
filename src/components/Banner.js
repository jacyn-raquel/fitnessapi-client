import {Row, Col, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function Banner({data}){

	const {title, subtitle, destination, buttonLabel} = data;

	return(
		<Row>
			<Col className="h-100 m-5">
				<h1> {title}</h1>
				<p> {subtitle} </p>
				<Button as={Link} variant="primary" to={destination}>{buttonLabel}</Button>
			</Col>
		</Row>

		)
}