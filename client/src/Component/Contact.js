import React from 'react'
import {NavLink} from "react-router-dom"

const Contact = () => {
  return (
    <>
      <header>
       
        <nav>
            <ul>
                <li>
                    <NavLink to = "/"> Home</NavLink>
                </li>

                <li>
                    <NavLink to = "/about"> About</NavLink>
                </li>
                <li>
                    <NavLink to = "/Contact"> Contact</NavLink>
                </li>
                <li>
                    <NavLink to = "/Signin">Signin</NavLink>
                </li>
                <li>
                    <NavLink to = "/Signup">Signup</NavLink>
                </li>
            </ul>
        </nav>
      </header>
      <section>
        <h1> Contact Page</h1>
      </section>
    </>
  )
}

export default Contact