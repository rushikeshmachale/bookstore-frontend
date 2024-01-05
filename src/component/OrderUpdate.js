import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";

const OrderUpdate = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({
    customerid: "",
    bookid: "",
    bookname: "",
    img: "",
    author: "",
    price: "",
    status: "",
  });
  const {customerid, bookid, bookname, img, author, price,status} = order
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}/orders/find/order/${id}`
    );
    setOrder(res.data);
  };
  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(`${process.env.REACT_APP_BACKEND_API}/orders/update/${id}`, order)
      .then(() => {
        navigate("/orders");
      })
      .catch(() => {
        toast.error("cannot update order");
      });
  };

  return (
    <div className="container">
      <Navbar />
      <div style={{ marginTop: "100px" }}></div>
      <ToastContainer />
      <form action="" className="form-control my-5">
        <h4 className=" text-center">Add new book</h4>
        <div className="form-row my-3 d-flex flex-wrap justify-content-center">
          <div className="form-group col-md-5 mx-4 my-2">
            <input
              type="text"
              className="form-control "
              name="bookname"
              value={bookname}
              onChange={handleChange}
              placeholder="Enter bookname"
              readOnly
            />
          </div>
          <div className="form-group col-md-5 mx-4  my-2">
            <input
              type="text"
              className="form-control "
              name="author"
              value={author}
              onChange={handleChange}
              placeholder="Enter author name"
              readOnly
            />
          </div>

          <div className="form-group col-md-5 mx-4  my-2">
            <input
              type="text"
              className="form-control "
              name="img"
              value={img}
              onChange={handleChange}
              placeholder="Enter img"
              readOnly
            />
          </div>

          <div className="form-group col-md-5 mx-4  my-2">
          <input
          type="text"
          className="form-control "
          name="bookid"
          value={bookid}
          onChange={handleChange}
          placeholder="Enter price"
          />
          </div>
          <div className="form-group col-md-5 mx-4  my-2">
          <input
          type="text"
              className="form-control "
              name="customerid"
              value={customerid}
              onChange={handleChange}
              placeholder="Enter price"
              readOnly
              />
              </div>
              <div className="form-group col-md-5 mx-4  my-2">
             
                <select
                  name="status"
                  value={status}
                  onChange={handleChange}
                  className="form-control"
                  id=""
                >
                  <option value={status}>{status}</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <i className=" text-danger">
                <sup>Change the status of selected order editable field</sup>
                </i>
              </div>
              <div className="form-group  mx-4  my-2">
            <button className="btn btn-info" onClick={handleSubmit}>
            Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OrderUpdate;
