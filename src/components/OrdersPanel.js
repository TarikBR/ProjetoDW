import React, { useEffect, useState } from 'react';
import { db } from '../config/Config';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
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

    setOrders((prevOrders) => {
      return prevOrders.map((order) =>
        order.id === orderId ? { ...order, Completed: true } : order
      );
    });
  };

  const deleteOrder = async (orderId) => {
    const orderRef = doc(db, 'Buyer-info', orderId);
    await deleteDoc(orderRef);

    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
  };

  const completedOrders = orders.filter((order) => order.Completed);
  const pendingOrders = orders.filter((order) => !order.Completed);

  return (
    <>
      {!user && <NotFound/>}
      {isAdmin && (
        <div>
          <Navbar user={user} isAdmin={true}/>
          <h2>Pedidos</h2>

          <div className="pending-banner">Pedidos Pendentes</div>
          <table className="pending-order">
            <thead>
              <tr>
                <th>Comprador</th>
                <th>Email</th>
                <th>Celular</th>
                <th>Produtos</th>
                <th>Total</th>
                <th>Endereço</th>
                <th>Concluída</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pendingOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.BuyerName}</td>
                  <td>{order.BuyerEmail}</td>
                  <td>{order.BuyerCell}</td>
                  <td>
                    <ul>
                      {order.BuyerProducts.map((product) => (
                        <li key={product.ProductName}>
                          {product.ProductName} - {product.qty}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>R${order.BuyerPayment},00</td>
                  <td>{order.BuyerAddress}</td>
                  <td>Não</td>
                  <td>
                    <button onClick={() => markAsCompleted(order.id)}>Concluir</button>
                    <button onClick={() => deleteOrder(order.id)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        <br/><br/><br/>

          <div className="completed-banner">Pedidos Concluídos</div>
          <table className="completed-order">
            <thead>
              <tr>
                <th>Comprador</th>
                <th>Email</th>
                <th>Celular</th>
                <th>Produtos</th>
                <th>Total</th>
                <th>Endereço</th>
                <th>Concluída</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {completedOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.BuyerName}</td>
                  <td>{order.BuyerEmail}</td>
                  <td>{order.BuyerCell}</td>
                  <td>
                    <ul>
                      {order.BuyerProducts.map((product) => (
                        <li key={product.ProductName}>
                          {product.ProductName} - {product.qty}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>R${order.BuyerPayment},00</td>
                  <td>{order.BuyerAddress}</td>
                  <td>Sim</td>
                  <td>
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