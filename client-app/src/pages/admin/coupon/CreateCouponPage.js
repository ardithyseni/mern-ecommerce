import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";
import {
  createCoupon,
  getCoupons,
  removeCoupon,
} from "../../../functions/couponFunctions";

const CreateCouponPage = () => {
  const [name, setName] = useState("");
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState("");
  const [coupons, setCoupons] = useState([]);

  const today = new Date(); // get today's date

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllCoupons();
  }, []);

  const loadAllCoupons = () => getCoupons().then((res) => setCoupons(res.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // console.table(name, expiryDate, discount);
    createCoupon({ name, expiryDate, discount }, user.token)
      .then((res) => {
        setLoading(false);
        loadAllCoupons();
        setName("");
        setDiscount("");
        setExpiryDate("");
        toast.success(`Coupon "${res.data.name}" is created`);
      })
      .catch((err) => console.log("create coupon error", err));
  };

  const handleRemoveCoupon = (couponId) => {
    if (window.confirm("Delete this coupon?")) {
      setLoading(true);
      removeCoupon(couponId, user.token).then((res) => {
        loadAllCoupons();
        setLoading(false);
        toast.message(`Coupon "${res.data.name}" deleted`);
      })
      .catch(err => console.log(err));
    }
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
          <br />
          <hr />
          <br />
          <h4>{coupons.length} coupons</h4>

          <table className="table table-hover table-bordered w-auto mt-1">
            <thead className="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Expiry Date</th>
                <th scope="col">Discount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{new Date(c.expiryDate).toLocaleDateString()}</td>
                  <td>{c.discount} %</td>
                  <td>
                    <DeleteOutlined
                      style={{ fontSize: "23px", cursor: "pointer" }}
                      onClick={() => handleRemoveCoupon(c._id)}
                      className="text-danger"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateCouponPage;
