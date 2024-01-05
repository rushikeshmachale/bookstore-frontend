import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import img1 from '../images/bookstore.avif';
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const { email, password } = user;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      toast.error("Please provide all fields");
    } else {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/customers/login`, user);
        navigate("/home");
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("customerid", response.data._id);
        localStorage.setItem("user", email);
      } catch (error) {
        toast.error("Invalid credentials");
      }
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <form className="signin-form my-5">
        <div className="row">
          <div className="col-md-6">
            <img src={img1} alt="" className="img-fluid" />
          </div>
          <div className="col-md-6">
            <h2 className="text-center">Sign In</h2>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Username</label>
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                id="password"
                className="form-control"
              />
            </div>
            <div className="text-center mb-3">
              <button className="btn btn-info" onClick={handleSubmit}>
                Login
              </button>
            </div>
            <div className="text-center">
              <Link to="/signup" className="text-decoration-none text-danger">
                Don't have an account? Register
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signin;
