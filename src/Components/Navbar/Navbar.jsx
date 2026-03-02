import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../Context/AuthContext";
import { washListContext } from "../Context/WashlistContext";
import { cartContext } from "../Context/CartContext";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import logo from "../../assets/Images/logo3.webp";

export default function Navbar() {
  const { logOut, token } = useContext(authContext);
  const { washlistItem } = useContext(washListContext);
  const { cartItems } = useContext(cartContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  function handleLogout() {
    logOut();
    navigate("/login");
  }

  return (
    <nav className="bg-[#004f44] NavBar fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left — Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} className="h-20" alt="BuyNest" />
        </Link>

        {/* Center — Links (Desktop) */}
        {token && (
          <div className="hidden md:flex gap-8 text-white/90 font-medium">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/category">Category</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>
        )}

        {/* Right — Icons */}
        <div className="flex items-center gap-4">
          {token && (
            <>
              {/* Cart & Wishlist — Desktop only */}
              <NavLink to="/cart" NavBar className="relative hidden md:block">
                <CiShoppingCart className="text-2xl text-white/90" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white/90 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </NavLink>

              <NavLink to="/wishlist" className="relative hidden md:block">
                <CiHeart className="text-2xl text-white/90" />
                {washlistItem.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white/90 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {washlistItem.length}
                  </span>
                )}
              </NavLink>

              {/* Logout */}
              <span
                className="hidden md:block cursor-pointer text-red-500/85 ms-2.5 "
                onClick={handleLogout}
              >
                Logout
              </span>
            </>
          )}

          {!token && (
            <div className="hidden md:flex gap-3">
              <NavLink
                to="/register"
                className="block text-white/90 cursor-pointer"
              >
                Register
              </NavLink>

              <NavLink
                to="/login"
                className="block text-white/90 cursor-pointer"
              >
                Login
              </NavLink>
            </div>
          )}

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white/90 text-2xl cursor-pointer "
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#004f44] px-4 pb-4 text-white/90 flex flex-col gap-3">
          {token && (
            <>
              {/* Links — vertical */}
              <NavLink to="/" onClick={() => setOpen(false)} className="block">
                Home
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setOpen(false)}
                className="block"
              >
                Contact
              </NavLink>
              <NavLink
                to="/category"
                onClick={() => setOpen(false)}
                className="block"
              >
                Category
              </NavLink>

              {/* Cart & Wishlist — Mobile only */}
              <div className="flex gap-4 pt-2">
                <NavLink to="/cart" className="relative cursor-pointer">
                  <CiShoppingCart className="text-2xl" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </NavLink>

                <NavLink to="/wishlist" className="relative cursor-pointer">
                  <CiHeart className="text-2xl " />
                  {washlistItem.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {washlistItem.length}
                    </span>
                  )}
                </NavLink>
              </div>

              <span
                className="w-full mt-3 cursor-pointer text-red-500/85 "
                onClick={handleLogout}
              >
                Logout
              </span>
            </>
          )}

          {!token && (
            <>
              <NavLink
                to="/login"
                onClick={() => setOpen(false)}
                className="block cursor-pointer"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setOpen(false)}
                className="block cursor-pointer "
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
