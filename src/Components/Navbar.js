import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'
import { useAuth0 } from "@auth0/auth0-react"
import {signup} from '../helpers/userHelpers'
import axios from 'axios'
import { userInfo } from 'os'

const Navbar = (props) => {
    const [isAuthenticated, setAuth] = useState(false)
    useEffect(() => {
        if(localStorage.getItem('token') != null) {
            setAuth(true)
        }
        else {
            setAuth(false)
        }
    }, [])
    const signUp = async () => {
        await props.signin()
        signup()
    }

    const login = async () => {
        await props.signin()
    }

    const signOut = async () => {
        await props.signout()
        setAuth(false)
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className='navbar-brand' to='/'>Home</Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigationbar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navigationbar">
                <ul className="nav navbar-nav ml-auto">
                    {!props.auth ? 
                    [<li className="nav-item" key="login">
                    <Link className='nav-link' to='' onClick={login} >Login</Link>
                    </li>,
                    <li className="nav-item" key="signup">
                        <Link className='nav-link' to='' onClick={signUp}>Sign Up</Link>
                    </li>] : 
                    <li className="nav-item">
                        <Link to='' className='nav-link' onClick={signOut}>Logout</Link>
                    </li>}
                </ul>
            </div>
      </nav>
    )
}

export default Navbar