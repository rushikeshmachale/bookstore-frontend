import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';

const View = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const customerid = localStorage.getItem("customerid");
  const [bookData, setBookData] = useState({});
  
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/books/get/${id}`);
      setBookData(res.data);
    } catch (error) {
      console.error("Error fetching book data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_API}/carts/add`, {
        customerid: customerid,
        bookid: id,
        img: bookData.img,
        bookname: bookData.bookname,
        price: bookData.price,
        author: bookData.author,
      });
      navigate("/cart");
    } catch (error) {
      toast.error("Couldn't add to cart");
    }
  };

  const handleSubmitOrders = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_API}/orders/save`, {
        customerid: customerid,
        bookid: id,
        img: bookData.img,
        bookname: bookData.bookname,
        price: bookData.price,
        author: bookData.author,
        status: 'pending',
      });
      navigate("/orders");
    } catch (error) {
      toast.error("Couldn't add order");
    }
  };

  return (
    <div className="container">
      <Navbar />
      <div style={{ marginTop: "80px" }}></div>
      <ToastContainer />
      <div className="card shadow my-5">
        <div className="card-body d-flex flex-wrap">
          <img
            src={bookData.img}
            className="card m-auto img-fluid"
          style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px', maxHeight: '350px', objectFit: 'cover'}}
            alt=""
            height={300}
            width={200}
          />
          <div className="card-text col-md-6 col-lg-4 col-xl-7 d-flex flex-column justify-content-between m-auto">
            <div className="text-center">
              <i className="text-secondary text-uppercase fs-2">
                {bookData.bookname}
              </i>
            </div>
            <div className="text-center">
              <b>Ratings:</b>{" "}
              <span className="text-danger">{bookData.ratings} ratings</span>
            </div>
            <div className="text-center">
              <b>Author:</b> {bookData.author}
            </div>
            <div className="text-center">
              <b>Price:</b> ₹{bookData.price}
            </div>
            <div className="text-center">
              <b>Reviews:</b>{" "}
              <p className="text-wrap">{bookData.reviews}</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-3 mb-3">
          <button onClick={handleSubmit} className="btn btn-dark mx-2">
            🛒 Cart
          </button>
          <button onClick={handleSubmitOrders} className="btn btn-warning mx-2">
            💲 Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default View;
