import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db, auth } from '../config/Config'
import { CartContext } from '../global/CartContext';
import { Navbar } from './Navbar';

export const Cashout = ({ user, isAdmin }) => {
    const navigate = useNavigate();
    const { shoppingCart, totalPrice, totalQty, dispatch } = useContext(CartContext);

    const simplifiedCart = shoppingCart.map(item => ({
        ProductName: item.ProductName,
        qty: item.qty,
      }));

    let totalPriceStr = 'R$ ' + totalPrice + ',00';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cell, setCell] = useState('');
    const [address, setAddress] = useState('Instituto Federal do Paraná (IFPR) - Campus Capanema');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userDocRef = doc(db, 'SignedUpUsersData', user.uid);
                const unsubscribeUserData = onSnapshot(userDocRef, (snapshot) => {
                    if (snapshot.exists()) {
                        setName(snapshot.data().Name);
                        setEmail(snapshot.data().Email);
                    }
                });
                return unsubscribeUserData;
            } else {
                navigate('/login');
            }
        });

        return unsubscribe;
    }, [auth, navigate]);

    const cashoutSubmit = async (e) => {
        e.preventDefault();
        try {
          const user = auth.currentUser;
          if (user) {
            const date = new Date();
            const time = date.getTime();
    
            const docRef = await addDoc(collection(db, 'Buyer-info'), {
              BuyerName: name,
              BuyerEmail: email,
              BuyerCell: cell,
              BuyerAddress: address,
              BuyerPayment: totalPrice,
              BuyerQuantity: totalQty,
              BuyerProducts: simplifiedCart,
              Timestamp: time,
            });
    
            setCell('');
            setAddress('');
            dispatch({ type: 'EMPTY' });
            setSuccessMsg('Seu pedido foi feito com sucesso. Você será redirecionado ao menu principal em 5 segundos.');
    
            setTimeout(() => {
              navigate('/')
            }, 5000);
          }
        } catch (err) {
          setError(err.message);
        }
      };

    return (
        <>
            {!isAdmin && (<Navbar user={user}/>)}
            {isAdmin && (<Navbar user={user} isAdmin={true}/>)}
            <div className="container">
                <br/>
                <h2>Detalhes de Pagamento</h2>
                <br/>
                {successMsg && <div className="success-msg">{successMsg}</div>}
                <form autoComplete="off" className="form-group" onSubmit={cashoutSubmit}>
                    <label htmlFor="name">Nome</label>
                    <input type="text" className="form-control" required value={name} disabled />
                    <br/>

                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" required value={email} disabled />
                    <br/>

                    <label htmlFor="Cell No">Número de Celular</label>
                    <input
                        type="number"
                        className="form-control"
                        required
                        onChange={(e) => setCell(e.target.value)}
                        value={cell}
                        placeholder="ex 46912345678"
                    />
                    <br/>

                    <label htmlFor="Delivery Address">Endereço de Entrega</label>
                    <input
                        type="text"
                        className="form-control"
                        required
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        disabled
                    />
                    <br/>

                    <label htmlFor="Total No of Products">Total de Produtos</label>
                    <input type="number" className="form-control" required value={totalQty} disabled />
                    <br/>

                    <label htmlFor="Price To Pay">Preço para Pagamento</label>
                    <input type="text" className="form-control" required value={totalPriceStr} disabled />
                    <br/>

                    <button type="submit" className="btn btn-success btn-md mybtn">Concluir</button>
                </form>
                {error && <span className="error-msg">{error}</span>}
            </div>
        </>
    );
};