import React, { useState } from 'react'
import { auth } from '../config/Config'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom'

export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
  
    const login = async (e) => {
      e.preventDefault();
  
      try {
        await signInWithEmailAndPassword(auth, email, password);
  
        setEmail('');
        setPassword('');
        setError('');
        navigate('/');
      } catch (err) {
        setError(err.message);
      }
    };

    return (
        <div className='container'>
            <br/>
            <h2>Logar</h2>
            <br/>
            <form autoComplete="off" className='form-group' onSubmit={login}>
                <label htmlFor="email">Email</label>
                <input type="email" className='form-control' required onChange={(e) => setEmail(e.target.value)} value={email}/>
                <br/>
                
                <label htmlFor="password">Senha</label>
                <input type="password" className='form-control' required onChange={(e) => setPassword(e.target.value)} value={password}/>
                <br />
                
                <button type="submit" className='btn btn-success btn-md mybtn'>Logar</button>
            </form>
            {error && <span className='error-msg'>{error}</span>}
            <br/>
            <span>Não tem uma conta? Registre <Link to="/signup">Aqui</Link>
            </span>
        </div>
    )
}