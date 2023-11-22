import React, { useContext } from 'react';
import logo from '../images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/Config';
import { Icon } from 'react-icons-kit'
import { cart } from 'react-icons-kit/entypo/cart'
import { CartContext } from '../global/CartContext'

export const Navbar = ({ user, isAdmin }) => {

  const navigate = useNavigate();
  const { totalQty } = useContext(CartContext);

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
        <Link to='/'><img src={logo} alt='' /></Link>
      </div>
      <div className='rightside'>
        {!user && (
          <>
            <span><Link to='/signup' className='navlink'>Registrar</Link></span>
            <span><Link to='/login' className='navlink'>Logar</Link></span>
          </>
        )}
        {isAdmin && (
          <span>
            <details className='admin'>
              <summary>Admin</summary>
              <Link to='/addproducts'>Adicionar Produtos</Link><br />
              <Link to='/removeproducts'>Remover Produtos</Link><br />
              <Link to='/orders'>Pedidos</Link>
            </details>
          </span>
        )}
        {user && (
          <>
            <span><Link to='/' className='navlink'>{user}</Link></span>
            <span><Link to="/cartproducts" className='navlink'><Icon icon={cart} /></Link></span>
            <span className='no-of-products'>{totalQty}</span>
            <span><button className='logout-btn' onClick={handleLogout}>Sair</button></span>
          </>
        )}
      </div>
    </div>
  );
};