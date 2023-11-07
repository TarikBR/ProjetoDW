import React, { createContext, useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../config/Config.js';

export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const unsubscribe = onSnapshot(collection(db, 'Products'), (snapshot) => {
        const updatedProducts = snapshot.docs.map((doc) => ({
          ProductID: doc.id,
          ProductName: doc.data().ProductName,
          ProductPrice: doc.data().ProductPrice,
          ProductImg: doc.data().ProductImg,
        }));
  
        setProducts(updatedProducts);
      });
  
      return () => {
        // Limpar o listener ao desmontar o componente
        unsubscribe();
      };
    }, []); // O segundo argumento vazio faz com que o efeito seja executado apenas uma vez, semelhante ao componentDidMount
  
    return (
      <ProductsContext.Provider value={{ products }}>
        {children}
      </ProductsContext.Provider>
    );
  };