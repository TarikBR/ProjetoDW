import React, {Component} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { AddProducts } from './components/AddProducts';
import 'bootstrap/dist/css/bootstrap.css'
import { Signup } from './components/Signup';
import { ProductsContextProvider } from './global/ProductsContext';
import { Login } from './components/Login';
import { auth, db } from './config/Config'
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { CartContextProvider } from './global/CartContext';
import { Cart } from './components/Cart'
import { ToastContainer } from "react-toastify";
import { Cashout } from './components/Cashout'

export class App extends Component{

  state = {
    user: null,
  }

  componentDidMount() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDocRef = doc(db, 'SignedUpUsersData', user.uid);
        getDoc(userDocRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              this.setState({
                user: snapshot.data().Name,
              });
            }
          })
          .catch((error) => {
            console.error('Error getting user data:', error);
          });
      } else {
        this.setState({
          user: null,
        });
      }
    });
  }

  render(){
    return(
      <ProductsContextProvider>
        <CartContextProvider>
          <BrowserRouter>
            <Routes>
              <Route exact path='/' Component={() => <Home user={this.state.user}/>}/>
              <Route path="/addproducts" Component={AddProducts}/>
              <Route path='/signup' Component={Signup}/>
              <Route path='/login' Component={Login}/>
              <Route path="/cartproducts" Component={() => <Cart user={this.state.user}/>}/>
              <Route path='/cashout' Component={() => <Cashout user={this.state.user}/>}/>
            </Routes>
            <ToastContainer/>
          </BrowserRouter>
        </CartContextProvider>
      </ProductsContextProvider>
    );
  };
};

export default App;