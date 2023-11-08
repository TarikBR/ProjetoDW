import React, { useContext } from 'react'
import { ProductsContext } from '../global/ProductsContext'
import { CartContext } from '../global/CartContext'

export const Products = () => {

    const { products } = useContext(ProductsContext);

    const { dispatch } = useContext(CartContext);

    return (
        <>
            {products.length !== 0 && <h1 className='products-title'>Produtos</h1>}
            <div className='products-container'>
                {products.length === 0 && <div>Carregando...</div>}
                {products.map(product => (
                    <div className='product-card' key={product.ProductID}>
                        <div className='product-img'>
                            <img src={product.ProductImg} alt="não encontrado" />
                        </div>
                        <div className='product-name'>
                            {product.ProductName}
                        </div>
                        <div className='product-price'>
                            R$ {product.ProductPrice}.00
                        </div>
                        <button className='addcart-btn' onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product })}>Adicionar ao Carrinho</button>
                    </div>
                ))}
            </div>
        </>
    )
}