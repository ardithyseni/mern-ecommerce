import React from "react";
import PaymentInfo from "../cards/PaymentInfo";

const OrdersHistory = ({ orders, handleStatusChange }) => {
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
                  <option value="Processing">Processing</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
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
