import React, { useEffect, useState } from 'react'
import UserNav from '../../components/nav/UserNav';
import { getUserOrders } from '../../functions/userFunctions';
import { useSelector } from 'react-redux';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { formatDateTime } from '../../utils/dateFormatter';

const UserHistory = () => {

  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () => getUserOrders(user?.token).then((res) => {
    console.log(JSON.stringify(res.data, null, 4));
    setOrders(res.data);
  });


  const showOrdersTable = (order) => {
    return (
      <table className='table table-hover table-bordered w-auto mt-1'>
        <thead className='thead-light'>
          <tr>
            <th scope='col'>Title</th>
            <th scope='col'>Price</th>
            <th scope='col'>Brand</th>
            <th scope='col'>Color</th>
            <th scope='col'>Count</th>
            <th scope='col'>Time</th>
            <th scope='col'>Shipping</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((p, i) => (
            <tr key={i}>
              <td><b>{p.product.title}</b></td>
              <td>{p.product.price} €</td>
              <td>{p.product.brand}</td>
              <td>{p.product.color}</td>
              <td>{p.count}</td>
              <td>{formatDateTime(order.createdAt)}</td>
              <td>{p.product.shipping === "Yes" ? (
                <CheckCircleOutlined style={{ color: 'green' }} />
              ) : (
                <CloseCircleOutlined style={{ color: "red" }} />
              )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  const showOrders = () => orders.map((order, i) => (
    <div key={i} className='m-5 p-3 card shadow'style={{ boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)' }}>
      <p>payment info</p>
      {showOrdersTable(order)}
      <div className='row'>
        <div className='col'>
          <p>pdf download</p>
        </div>
      </div>
    </div>
  ))

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col text-center">
          <h4>
            {orders.length ? "Purchase History" : "No Purchase History"}
          </h4>
          {showOrders()}
        </div>
      </div>
    </div>

  )
}

export default UserHistory;