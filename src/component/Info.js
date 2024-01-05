import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Info = () => {
  const [info, setInfoData] = useState([]);

  const id = localStorage.getItem("customerid");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/customers/find/${id}`);
    setInfoData([res.data]);
  };
  console.log(id);

  return (
    <div className="container">
      <Navbar />
      <div style={{ marginTop: "90px" }}></div>
      <div className="card my-5 w-75 m-auto">
        {info.map((x) => (
          <div
            key={x._id}
            className="card-body d-flex flex-column justify-content-center align-content-center"
          >
            <div className="card-text rounded-3 m-auto"></div>
            <div className="card-text m-auto">
              <img
                src={x.img}
                style={{ borderRadius: "50%" }} 
                alt="Please upload img"
                height={150}
                width={150}
              />
            </div>
           
            <b className="card-text m-auto mt-4"> <i>Name
            </i> </b>
            <p className="m-auto">{x.name}</p>
            <b className="card-text m-auto mt-4"><i>Email</i> </b>
            <p className="m-auto">{x.email}</p>
            <b className="card-text m-auto mt-4"><i>Account created </i> </b>
            <p className="m-auto">{new Date(x.createdAt).toLocaleString()}</p>

            <div className="card-text m-auto mt-3 d-flex flex-wrap">
              <Link to="/home" className=" btn btn-dark">
                Home
              </Link>
              <Link to={`/customer/update/${x._id}`} className=" btn btn-dark mx-2">
                Update
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Info;
