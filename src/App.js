import React, {Component} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { AddProducts } from './components/AddProducts';
import 'bootstrap/dist/css/bootstrap.css'

export class App extends Component{
  render(){
    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addproducts" element={<AddProducts />} />
        </Routes>
      </BrowserRouter>
    );
  };
};

export default App;