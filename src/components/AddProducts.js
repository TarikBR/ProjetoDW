import React, { useState } from 'react';
import { getAuth, getFirestore, getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from '../config/Config';

export const AddProducts = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productImg, setProductImg] = useState(null);
    const [error, setError] = useState('');

    const types = ['image/png', 'image/jpeg'];

    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductImg(selectedFile);
            setError('')
        }
        else {
            setProductImg(null);
            setError('Por favor, selecione um arquivo de imagem válido (jpg ou png)');
        }
    }

    const addProduct = async (e) => {
        e.preventDefault();
    
        try {
          const storageRef = ref(storage, `product-images/${productImg.name}`);
          await uploadBytes(storageRef, productImg);
    
          const url = await getDownloadURL(storageRef);
          
          await addDoc(collection(db, 'Products'), {
            ProductName: productName,
            ProductPrice: Number(productPrice),
            ProductImg: url
          });
    
          setProductName('');
          setProductPrice(0);
          setProductImg('');
          setError('');
          document.getElementById('file').value = '';
        } catch (err) {
          setError(err.message);
        }
      };

    return(
        <div className='container'>
            <br/>
            <h2>Adicionar Produtos</h2>
            <hr/>
            <form autoComplete='off' action='' className='form-group' onSubmit={addProduct}>
                <label htmlFor="product-name">Nome do Produto</label>
                <input type="text" className='form-control' required onChange={(e) => setProductName(e.target.value)} value={productName} />
                <br/>

                <label htmlFor="product-price">Preço do Produto</label>
                <input type="number" className='form-control' required onChange={(e) => setProductPrice(e.target.value)} value={productPrice} />
                <br/>

                <label htmlFor="product-img">Imagem do Produto</label>
                <input type="file" className='form-control' id="file" required onChange={productImgHandler} />
                <br/>

                <button type="submit" className='btn btn-success btn-md mybtn'>Adicionar</button>
            </form>
            {error && <span className='error-msg'>{error}</span>}
        </div>
    )
}