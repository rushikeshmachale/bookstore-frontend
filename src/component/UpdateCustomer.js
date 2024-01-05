

import React, { useEffect, useState } from "react";
import {ThreeDots} from 'react-loader-spinner'
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const UpdateCustomer = () => {
  const navigate = useNavigate();
  const {id} = useParams()
  const [user, setUser] = useState({ });
  const [loading,setLoading] = useState(false)
  const [img,setImg] = useState(null)

  const api = process.env.REACT_APP_BACKEND_API 

  useEffect(()=>{loadData()},[])

  const loadData = async()=>{
    const res = await axios.get(`${api}/customers/find/${id}`)
    setUser(res.data)
  }
  const {name, email, password } = user;
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const uploadImage =async(type)=>{
        const data= new FormData();
        data.append("file",img)
        data.append("upload_preset","images_preset")

        try {
          let cloudName = process.env.REACT_APP_CLOUD_NAME 
          let resourceType = 'image'
          let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`

          const res = await axios.post(api,data)
          const {secure_url} = res.data
          console.log(secure_url);
          return secure_url;
        } catch (error) {
          console.log(error);
        }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const imgUrl = await uploadImage("image")
    await axios
      .put(`${process.env.REACT_APP_BACKEND_API}/customers/edit/${id}`, {name:name, email:email,img:imgUrl, password:password,role:'user'})
      .then((e) => {
        setImg(null)
        setLoading(false)
        navigate("/home");
        console.log(user);

      })
      .catch(() => {
        toast.error("Invalid credentials");
      });
  };
  return (
    <div className="container">
      <ToastContainer />
      <form action="" className=" form-control my-5 w-50 m-auto">
        <h2 className=" text-center">Update</h2>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleChange}
          className=" form-control my-2 "
          placeholder="Enter your name"
        />
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={handleChange}
          className=" form-control my-2 "
          readOnly
          placeholder="Enter your email"
        />
       
       
        <div className="form-group col-md-5 mx-auto text-center my-2">
        <button
          type="button"
          className="btn btn-secondary mt-2"
          onClick={() => document.getElementById("image").click()}
        >
          Change Image
        </button>
        <input
          type="file"
          accept="image/*"
          id="image"
          className=" d-none"
          onChange={(e) => setImg(e.target.files[0])}
        />
      </div>
        <div className="text-center my-3 mx-auto">
        
        <Link to='/home' className="btn btn-info mx-2">Home</Link>
          <button className="btn btn-info" onClick={handleSubmit}>
           {loading ? 'Please Wait...':'Update'} 
          </button>
        </div>
        
      </form>
    </div>
  );
};

export default UpdateCustomer;
