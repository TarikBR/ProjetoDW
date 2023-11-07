import React, { useContext } from 'react'
import { ProductsContext } from '../global/ProductsContext'

export const Products = () => {

    const { products } = useContext(ProductsContext);

    return (
        <>
            {products.length !== 0 && <h1>Produtos</h1>}
            <hr/>
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
                        <button className='addcart-btn'>Adicionar ao Carrinho</button>
                    </div>
                ))}
            </div>
        </>
    )
}