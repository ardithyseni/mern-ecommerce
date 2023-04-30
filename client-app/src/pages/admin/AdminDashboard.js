import React, { useEffect, useState } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import {
  getUserOrders,
  changeOrderStatus,
} from "../../functions/adminFunctions";
import OrdersHistory from "../../components/order/OrdersHistory";
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllOrders();
  }, []);

  const loadAllOrders = () => {
    getUserOrders(user?.token)
      .then((res) => {
        console.log(JSON.stringify(res.data, null, 2));
        setOrders(res.data);
      });
  };


  const handleStatusChange = (orderId, orderStatus) => {
    changeOrderStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success('Status updated');
      console.log(res.data)
      loadAllOrders();
    })
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          <h4>Admin Dashboard</h4>
          <OrdersHistory orders={orders} handleStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
