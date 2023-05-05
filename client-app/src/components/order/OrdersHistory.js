import React from "react";
import PaymentInfo from "../cards/PaymentInfo";
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { formatDateTime } from "../../utils/dateFormatter";

const OrdersHistory = ({ orders, handleStatusChange }) => {

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

  return (
    <>
      {orders.map((order) => (
        <div key={order._id} className="row m-5 card bg-light">
          <div className="card-body d-flex flex-column align-items-center">
            <PaymentInfo order={order} />

            <div className="row mt-4 w-100">
              <div className="col-md-3 d-flex justify-content-end align-items-center">
                Order Status:
              </div>
              <div className="col-md-9">
                <select
                  className="form-control"
                  defaultValue={order.orderStatus}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  name="status"
                >
                  <option value="Not Processed">Not Processed</option>
                  <option value="Cash on Delivery">Cash on Delivery</option>
                  <option value="Processing">Processing</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
          {showOrdersTable(order)}
        </div>
      ))}
    </>
  );
};

export default OrdersHistory;
/* 
'Not Processed',
'Processing',
'Dispatched',
'Cancelled',
'Completed',
*/
