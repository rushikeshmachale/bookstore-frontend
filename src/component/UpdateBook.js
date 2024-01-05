import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./Navbar";

const UpdateBook = () => {
  const { id } = useParams();

  const api = process.env.REACT_APP_BACKEND_API;

  console.log(api);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState(null);
  // const [bookData, setBookData] = useState({
  //   bookname: "",
  //   author: "",
  //   price: "",
  //   ratings: "",
  //   reviews: "",
  // });
  const [bookData, setBookData] = useState({});

  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/books/get/${id}`);
    setBookData(res.data);
  };
  const { bookname, author, price, ratings, reviews } = bookData;

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };
  const uploadImage = async (type) => {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "images_preset");

    try {
      let cloudName = process.env.REACT_APP_CLOUD_NAME;
      let resourceType = "image";
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      console.log(secure_url);
      return secure_url;
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const imgUrl = await uploadImage("image");
    await axios
      .put(`${process.env.REACT_APP_BACKEND_API}/books/edit/${id}`, { ...bookData, img: imgUrl })
      .then(() => {
        setImg(null);
        setLoading(false);
        navigate("/home");
      })
      .catch(() => {
        setLoading(true);

        toast.error("Book not updated");
      });
  };
  return (
    <div className="container">
      <Navbar />
      <div style={{ marginTop: "100px" }}></div>
      <ToastContainer />
      <form action="" className="form-control my-5">
        <h4 className=" text-center">Update book</h4>
        <div className="form-row my-3 d-flex flex-wrap justify-content-center">
          <div className="form-group col-md-5 mx-4 my-2">
            <input
              type="text"
              className="form-control "
              name="bookname"
              value={bookname}
              onChange={handleChange}
              placeholder="Enter bookname"
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
            />
          </div>

          <div className="form-group col-md-5 mx-4  my-2">
            <input
              type="text"
              className="form-control "
              name="ratings"
              value={ratings}
              onChange={handleChange}
              placeholder="Enter ratings"
            />
          </div>

          <div className="form-group col-md-5 mx-4  my-2">
            <input
              type="text"
              className="form-control "
              name="reviews"
              value={reviews}
              onChange={handleChange}
              placeholder="Enter reviews"
            />
          </div>
          <div className="form-group col-md-5 mx-4  my-2">
            <input
              type="text"
              className="form-control "
              name="price"
              value={price}
              onChange={handleChange}
              placeholder="Enter price"
            />
          </div>

          <div className="form-group col-md-5 mx-4 my-2">
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

          <div className="form-group  mx-4  my-2">
            <button className="btn btn-info" onClick={handleSubmit}>
              {loading ? "Please Wait..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateBook;
