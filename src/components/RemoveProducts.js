import React, { useContext } from 'react'
import { ProductsContext } from '../global/ProductsContext'
import { db } from '../config/Config';
import { doc, deleteDoc } from 'firebase/firestore';

export const RemoveProducts = ({user, isAdmin}) => {

    const { products } = useContext(ProductsContext);

    const deleteProduct = async (productID) => {
        const productRef = doc(db, 'Products', productID);
        await deleteDoc(productRef);
    };

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
                        <button className='deleteproduct-btn' onClick={() => deleteProduct(product.ProductID)}>Deletar</button>
                    </div>
                ))}
            </div>
        </>
    )
}