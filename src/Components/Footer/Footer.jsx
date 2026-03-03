import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../Context/AuthContext";

export default function Footer() {
  const { logOut, token } = useContext(authContext);
  const navigate = useNavigate();

  function handleLogout() {
    logOut();
    navigate("/login");
  }

  return (

      <footer className="bg-[#004f44] text-white mt-16 bottom-0">
        <div className="container mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold mb-3">BuyNest</h2>
            <p className="text-gray-400">
              BuyNest - Your smart place to find everything you need at great
              prices.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              {token && (
                <>
                  <li>
                    <NavLink to="/" className=" hover:text-[#ffa600db] ">
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/category"
                      className=" hover:text-[#ffa600db] "
                    >
                      Category
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/wishlist"
                      className=" hover:text-[#ffa600db] "
                    >
                      Wishlist
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/cart" className=" hover:text-[#ffa600db] ">
                      Cart
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block hover:text-red-600 duration-200 transition ease-in cursor-pointer w-fit"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}

              {!token && (
                <>
                  <li>
                    <NavLink
                      to="/register"
                      className=" hover:text-[#ffa600db] "
                    >
                      Register
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login" className=" hover:text-[#ffa600db] ">
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-3">Customer Service</h3>
            <ul className="space-y-2 text-gray-400">
              {token && (

                  <li>
                    <NavLink to="/contact" className=" hover:text-[#ffa600db] ">
                      Contact Us
                    </NavLink>
                  </li>

              )}

              <li>FAQ</li>

              {token && (

                  <li>
                    <NavLink to="/" className=" hover:text-[#ffa600db] ">
                      Returns
                    </NavLink>
                  </li>

              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-3">Contact</h3>
            <p className="text-gray-400">Cairo, Egypt</p>
            <p className="text-gray-400">support@buynest.com</p>
            <p className="text-gray-400">+20 10 1234 5678</p>
          </div>
        </div>

        <div className="text-center py-4 border-t border-gray-700 text-gray-500">
          © 2026 BuyNest. All rights reserved.
        </div>
      </footer>
  );
}
