import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const email = localStorage.getItem("user");
  const role = localStorage.getItem("role");
  return (
    <div>
      <nav
        className="navbar fixed-top navbar-expand-lg navbar-dark py-3 "
        style={{ backgroundColor: " #3ac390" }}
      >
        <div className="container-fluid">
          <span>
            <Link className="navbar-brand" to={`/home`}>
              eBookStore
            </Link>
          </span>
           
         
          <div className="dropdown mx-2">
          <span
          className="text-dark float-end text-center"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <svg
            viewBox="0 0 24 24"
            height="24"
            width="24"
            preserveAspectRatio="xMidYMid meet"
            className=""
            version="1.1"
            x="0px"
            y="0px"
            enable-background="new 0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12,7c1.104,0,2-0.896,2-2c0-1.105-0.895-2-2-2c-1.104,0-2,0.894-2,2 C10,6.105,10.895,7,12,7z M12,9c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,9.895,13.104,9,12,9z M12,15 c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,15.894,13.104,15,12,15z"
            ></path>
          </svg>
        </span>

            <ul style={{margin:"10px -130px"}} className="dropdown-menu mr-5" >
              <li>
                <Link className="dropdown-item" to={`/home`}>
                  Home
                </Link>
              </li>
              {role === "admin" ? (
                <div>
                  {" "}
                  <li>
                    <Link className="dropdown-item" to={`/orders`}>
                       Orders
                    </Link>
                  </li>
                
                  
                  <li><Link to='/addbook' className="dropdown-item">Add Books</Link></li>
                </div>
              ) : (
                <div>
                
                <li>
                <Link className="dropdown-item" to={`/cart`}>
                  Cart
                </Link>
              </li>
              
              <li>
              <Link className="dropdown-item" to={`/orders`}>
                Orders
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to={`/profile`}>
                Profile
              </Link>
            </li>
                </div>
              )}
              <li>
                <Link
                  className="dropdown-item"
                  to='/'
                  onClick={() => {
                    localStorage.clear();
                
                  }}
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
