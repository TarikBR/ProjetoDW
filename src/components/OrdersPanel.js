import React, { useEffect, useState } from 'react';
import { db } from '../config/Config';
import { collection, getDocs, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { Navbar } from './Navbar';
import { NotFound } from './NotFound';

export const OrdersPanel = ({ user, isAdmin }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersCollection = collection(db, 'Buyer-info');
      const ordersSnapshot = await getDocs(ordersCollection);
      const ordersList = [];

      ordersSnapshot.forEach((doc) => {
        ordersList.push({ id: doc.id, ...doc.data() });
      });

      setOrders(ordersList);
    };

    fetchOrders();
  }, [user]);

  const markAsCompleted = async (orderId) => {
    const orderRef = doc(db, 'Buyer-info', orderId);
    await updateDoc(orderRef, { Completed: true });
  };

  const deleteOrder = async (orderId) => {
    const orderRef = doc(db, 'Buyer-info', orderId);
    await deleteDoc(orderRef);
  };

  return (
    <>
      {!user && (<NotFound/>)}
      {isAdmin && (
        <div>
          <Navbar user={user}/>
          <h2>Admin Panel</h2>
          <table>
            <thead>
              <tr>
                <th>Comprador</th>
                <th>Email</th>
                <th>Produtos</th>
                <th>Endereço</th>
                <th>Concluída</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.BuyerName}</td>
                  <td>{order.BuyerEmail}</td>
                  <td>
                    <ul>
                      {order.BuyerProducts.map((product) => (
                        <li key={product.ProductName}>
                          {product.ProductName} - {product.qty}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{order.BuyerAddress}</td>
                  <td>{order.Completed ? 'Sim' : 'Não'}</td>
                  <td>
                    <button onClick={() => markAsCompleted(order.id)}>Concluir</button>
                    <button onClick={() => deleteOrder(order.id)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};