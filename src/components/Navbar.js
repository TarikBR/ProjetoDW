import React from 'react';
import logo from '../images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/Config';

export const Navbar = ({user}) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <div className='navbox'>
      <div className='leftside'>
        <img src={logo} alt='' />
      </div>
      {!user && (
        <div className='rightside'>
          <span><Link to='signup' className='navlink'>Registrar</Link></span>
          <span><Link to='login' className='navlink'>Logar</Link></span>
        </div>
      )}
      {user && (
        <div className='rightside'>
          <span><Link to='/' className='navlink'>{user}</Link></span>
          <span><button className='logout-btn' onClick={handleLogout}>Sair</button></span>
        </div>
      )}
    </div>
  );
};