import React from 'react'
import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from './Component/Navbar'
import Home from './Component/Home'
import Contact from './Component/Contact'
import About from './Component/About'
import Signin from './Component/Signin'
import SignUp from './Component/SignUp'


const App = () => {
  return (

    <div className='App'>
      
      <Router>
          <Routes>
            
            <Route exact path = '/' element={<Navbar/>} />
            <Route  path = '/home' element ={<Home/>} />
            <Route  path = '/contact' element ={<Contact/>} />
            <Route  path = '/about' element ={<About/>} />
            <Route  path = '/signin' element ={<Signin/>} />
            <Route  path = '/signup' element ={<SignUp/>} />

            
          </Routes>
 
      </Router>
      </div>
  );
};

export default App;

/*import React from "react";
import Nav from "./components/nav";
import Home from "./components/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom"

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Nav} />
                <Route path="/home" component={Home} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;*/
  //<Route exact path="/" component={Nav} />



/*<Routes>
  <Route path='signin' element={<SignIn />} />
  <Route path='signup' element={<SignUp />} />
  <Route path='recovery' element={<PasswordRecovery />} />
</Routes> */