import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./component/Dashboard";
import Signin from "./component/Signin";
import Signup from "./component/Signup";
import AddBook from "./component/AddBook";
import View from "./component/View";
import Cart from "./component/Cart";
import Orders from "./component/Orders";
import Info from "./component/Info";
import OrderUpdate from "./component/OrderUpdate";
import UpdateBook from "./component/UpdateBook";
import UpdateCustomer from "./component/UpdateCustomer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/edit/:id" element={<UpdateBook />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Info />} />
        <Route path="/order/update/:id" element={<OrderUpdate />} />
        <Route path="/customer/update/:id" element={<UpdateCustomer />} />
        <Route path="*" element={<b className="container text-center card p-3 my-5">404 page not found</b>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
