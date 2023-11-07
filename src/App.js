import React, {Component} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { AddProducts } from './components/AddProducts';
import 'bootstrap/dist/css/bootstrap.css'
import { Signup } from './components/Signup';
import { ProductsContextProvider } from './global/ProductsContext';
import { Login } from './components/Login';

export class App extends Component{
  render(){
    return(
      <ProductsContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={Home}/>
            <Route path="/addproducts" Component={AddProducts}/>
            <Route path='/signup' Component={Signup}/>
            <Route path='/login' Component={Login}/>
          </Routes>
        </BrowserRouter>
      </ProductsContextProvider>
    );
  };
};

export default App;