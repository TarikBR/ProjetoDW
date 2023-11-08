import React, { useContext, useEffect } from 'react'
import { CartContext } from '../global/CartContext'
import { Navbar } from './Navbar';
import { Icon } from 'react-icons-kit'
import { ic_add } from 'react-icons-kit/md/ic_add'
import { ic_remove } from 'react-icons-kit/md/ic_remove'
import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/Config'

export const Cart = ({ user }) => {

    const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(CartContext);

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/login');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    return (
        <>
            <Navbar user={user} />
            <>
                {shoppingCart.length !== 0 && <h1>Carrinho</h1>}
                <div className='cart-container'>
                    {
                        shoppingCart.length === 0 && <>
                            <div>Sem produtos em seu carrinho, ou você não está logado</div>
                            <div><Link to="/">Voltar para página principal</Link></div>
                        </>
                    }
                    {shoppingCart && shoppingCart.map(cart => (
                        <div className='cart-card' key={cart.ProductID}>

                            <div className='cart-img'><img src={cart.ProductImg} alt="não encontrado"/></div>

                            <div className='cart-name'>{cart.ProductName}</div>

                            <div className='cart-price-orignal'>R$ {cart.ProductPrice}.00</div>

                            <div className='inc' onClick={() => dispatch({ type: 'INC', id: cart.ProductID, cart })}><Icon icon={ic_add} size={24}/></div>

                            <div className='quantity'>{cart.qty}</div>

                            <div className='dec' onClick={() => dispatch({ type: 'DEC', id: cart.ProductID, cart })}><Icon icon={ic_remove} size={24}/></div>

                            <div className='cart-price'>R$ {cart.TotalProductPrice}.00</div>

                            <button className='delete-btn' onClick={() => dispatch({ type: 'DELETE', id: cart.ProductID, cart })}><Icon icon={iosTrashOutline} size={24}/></button>
                        </div>
                    ))}
                    {shoppingCart.length > 0 && <div className='cart-summary'>
                        <div className='cart-summary-heading'>Sumário</div>
                        <div className='cart-summary-price'>
                            <span>Preço total</span>
                            <span>R$ {totalPrice}.00</span>
                        </div>
                        <div className='cart-summary-price'>
                            <span>Quantidade</span>
                            <span>{totalQty}</span>
                        </div>
                        <Link to='cashout' className='cashout-link'><button className='btn btn-success btn-md' style={{ marginTop: 5 + 'px' }}>Pagar na entrega</button></Link>
                    </div>}
                </div>
            </>
        </>
    )
}