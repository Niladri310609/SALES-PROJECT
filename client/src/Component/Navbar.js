import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import logo from "../Images/image.jpg"
import {NavLink} from "react-router-dom"




const Navbar = () => {
  return (
    <>
         <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <NavLink class="navbar-brand" to="#"><img src={logo} alt ="logo"/></NavLink>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item active">
        <a class="nav-link" href="/home">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/contact">Contact</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/about">About</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/signin">Sign in</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/signup">Sign up</a>
      </li>
      
      
    </ul>
   
  </div>
</nav>

    </>
  )
}

export default Navbar
