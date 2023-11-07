import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../config/Config';
import { Link, useNavigate } from 'react-router-dom'
import { collection, setDoc, doc } from 'firebase/firestore';

export const Signup = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const userCollection = collection(db, 'SignedUpUsersData');

      await setDoc(doc(userCollection, cred.user.uid), {
        Name: name,
        Email: email,
        Password: password,
      });

      setName('');
      setEmail('');
      setPassword('');
      setError('');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='container'>
      <br />
      <h2>Registrar</h2>
      <br />
      <form autoComplete='off' className='form-group' onSubmit={signup}>
        <label htmlFor='name'>Nome</label>
        <input type='text' className='form-control' required onChange={(e) => setName(e.target.value)} value={name}/>
        <br/>

        <label htmlFor='email'>Email</label>
        <input type='email' className='form-control' required onChange={(e) => setEmail(e.target.value)} value={email}/>
        <br/>

        <label htmlFor='passowrd'>Senha</label>
        <input type='password' className='form-control' required onChange={(e) => setPassword(e.target.value)} value={password}/>
        <br/>

        <button type='submit' className='btn btn-success btn-md mybtn'>Registrar</button>
      </form>
      {error && <span className='error-msg'>{error}</span>}
      <br />
      <span>
        Já possui uma conta? Logue <Link to='/login'>Aqui</Link>
      </span>
    </div>
  );
};