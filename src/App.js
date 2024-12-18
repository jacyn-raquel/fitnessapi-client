// Import Pages
import Home from './pages/Home';
import AppNavBar from './components/AppNavBar';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Workouts from './pages/Workouts';
import AddWorkout from './pages/AddWorkout';
import Error from './pages/Error';

// Import packages
import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {UserProvider} from './UserContext';
import {Container} from 'react-bootstrap';


function App() {

  // Setting the user
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })

  // Deleting token
  function unsetUser(){
    localStorage.clear();
  }

 useEffect(()=>{
    const token = localStorage.getItem('token');

    if(token){
      fetch(`${process.env.REACT_APP_API_URL}/b2/users/details`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);

        data._id === undefined ? (
          setUser({
            id:null,
            isAdmin: null
          }))
        :
          (
            setUser({
              id:data._id,
              isAdmin: data.isAdmin
            })

            )
      })
    } else {
      setUser({
        id:null,
        isAdmin: null
      })
    }
  },[])
  
  return (
    <>
      <UserProvider value = {{user, setUser, unsetUser}}>
        <Router>
          <AppNavBar/>
            <Container>
              <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/logout' element={<Logout/>}/>
                <Route path='/workouts' element={<Workouts/>}/>
                <Route path='/addWorkout' element={<AddWorkout/>}/>
                <Route path='*' element={<Error/>}/>
              </Routes>
            </Container>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
