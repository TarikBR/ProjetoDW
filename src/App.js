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
import { NotFound } from './components/NotFound';
import { OrdersPanel } from './components/OrdersPanel';
import { RemoveProductsPage } from './components/RemoveProductsPage'

export class App extends Component{

  state = {
    user: null,
    isAdmin: false,
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
                isAdmin: snapshot.data().isAdmin,
              });
            }
          })
          .catch((error) => {
            console.error('Error getting user data:', error);
          });
      } else {
        this.setState({
          user: null,
          isAdmin: false,
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
              <Route path="/addproducts" Component={() => <AddProducts user={this.state.user} isAdmin={this.state.isAdmin}/>}/>
              <Route path='/signup' Component={Signup}/>
              <Route path='/login' Component={Login}/>
              <Route path="/cartproducts" Component={() => <Cart user={this.state.user}/>}/>
              <Route path='/cashout' Component={() => <Cashout user={this.state.user}/>}/>
              <Route path='/orders' Component={() => <OrdersPanel user={this.state.user} isAdmin={this.state.isAdmin}/>}/>
              <Route path='/removeproducts' Component={() => <RemoveProductsPage user={this.state.user} isAdmin={this.state.isAdmin}/>}/>
              <Route path='*' Component={NotFound}/>
            </Routes>
            <ToastContainer/>
          </BrowserRouter>
        </CartContextProvider>
      </ProductsContextProvider>
    );
  };
};

export default App;