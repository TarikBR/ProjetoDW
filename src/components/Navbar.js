import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

export const Navbar = () => {
    return(
        <div className='navbox'>
            <div className='leftside'>
                <img src={logo} alt='Logo'></img>
            </div>
            <div className='rightside'>
                <Link to='/signup' className='navlinks'>Registrar</Link>
                <Link to='/login' className='navlinks'>Logar</Link>
            </div>
        </div>
    );
};