import { Navigate } from 'react-router-dom';

import {useContext, useEffect} from 'react';

import UserContext from '../UserContext';

export default function Logout(){

	// consume user context
	const {user, setUser, unsetUser} = useContext(UserContext);
	// clear the localstorage
	

	useEffect(()=>{
		unsetUser();
		
		setUser({
			id: null,
			isAdmin: null
		})

	}, []);

	// localStorage.clear();

	return(
		user.id === null ?
		<Navigate to='/'/>
		: 
		<Navigate to="/logout"/>
	

	)
}