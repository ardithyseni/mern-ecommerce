import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";
import { createCoupon } from "../../../functions/couponFunctions";

const CreateCouponPage = () => {
  const [name, setName] = useState("");
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState("");
  const [coupon, setCoupon] = useState("");
  const today = new Date(); // get today's date

  const { user } = useSelector((state) => ({ ...state }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // console.table(name, expiryDate, discount);
    createCoupon({ name, expiryDate, discount }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        setDiscount("");
        setExpiryDate("");
        toast.success(`Coupon ${res.data.name} is created`);
      })
      .catch((err) => console.log("create coupon error", err));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Coupon</h4>

          <form onSubmit={handleSubmit} className="col-md-6">
            <div className="form-group">
              <label className="text-muted">Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Discount Percent</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Expiry Date</label>
              <DatePicker
                className="form-control"
                selected={expiryDate}
                value={expiryDate}
                dateFormat="dd/MM/yyyy"
                onChange={(date) => setExpiryDate(date)}
                required
                minDate={today} // set minDate to today's date
              />
            </div>
            <button className="btn btn-outline-primary">Create Coupon</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCouponPage;
