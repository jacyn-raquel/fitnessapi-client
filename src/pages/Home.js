import {Button} from 'react-bootstrap';
import Banner from '../components/Banner';
import UserContext from '../UserContext';
import {useContext, useState, useEffect} from 'react';


export default function Home(){

	const {user} = useContext(UserContext);
	const [data, setData] = useState({});
	const [token, setToken] = useState('');
 

	useEffect(()=>{
		setToken(localStorage.getItem('token'));

		if(!token || user.id === null){
			setData({
				title: "Welcome to Zuitt Workouts",
				subtitle: "Your workout tracker!",
				destination: "/login",
				buttonLabel: "Login to Get Started"
			}) 
		} else {
			setData({
				title: "Welcome to Zuitt Workouts",
				subtitle: "Your workout tracker!",
				destination: "/workouts",
				buttonLabel: "See My Workouts"
			}) 
		}
		
	},[])
	

	return (
		<>
			<Banner data = {data}/>
		</>
		)
}