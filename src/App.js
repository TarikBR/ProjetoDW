import React, {Component} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { AddProducts } from './components/AddProducts';
import 'bootstrap/dist/css/bootstrap.css'
import { Signup } from './components/Signup';
import { ProductsContextProvider } from './global/ProductsContext';

export class App extends Component{
  render(){
    return(
      <ProductsContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/addproducts" element={<AddProducts/>}/>
            <Route path='/signup' element={<Signup/>}/>
          </Routes>
        </BrowserRouter>
      </ProductsContextProvider>
    );
  };
};

export default App;