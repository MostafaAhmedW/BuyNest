import React, { useContext } from "react";
import { cartContext } from "../Context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cartItems, removeFromCart, increaseQty, decreaseQty, clearCart } =
    useContext(cartContext);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className="max-w-6xl mx-auto p-5 container  mt-16 ">
      {/* Header */}
      <div className="bg-white shadow rounded-xl p-5 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-semibold text-[#076b5e]">
          Shopping Cart:{" "}
          <span className="text-orange-500/85 font-normal">
            {cartItems.length}
          </span>{" "}
        </h1>

        {cartItems.length > 0 && (
          <div className="flex items-center gap-4 ">
            <h2 className="text-xl text-[#076b5e] font-semibold">
              Total: ${totalPrice.toFixed(2)}
            </h2>

            <button
              onClick={clearCart}
              className="bg-red-500/90 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>

      {/* Empty */}
      {cartItems.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500 text-lg">
          Your cart is empty
        </div>
      ) : (
        <>
          {/* ========================= */}
          {/* Desktop Table */}
          {/* ========================= */}
          <div className="hidden md:block bg-white shadow rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left text-black/65">Image</th>
                  <th className="p-4 text-left text-black/65">Product</th>
                  <th className="p-4 text-left text-black/65">Qty</th>
                  <th className="p-4 text-left text-black/65">Price</th>
                  <th className="p-4 text-left text-black/65">Action</th>
                </tr>
              </thead>

              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-4">
                      <Link to={`/productDetails/${item.id}`}>
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-24 rounded"
                        />
                      </Link>
                    </td>

                    <td className="p-4 font-semibold text-black/65">
                      {item.title}
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="w-8 h-8 bg-gray-200 rounded cursor-pointer"
                        >
                          -
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() => increaseQty(item.id)}
                          className="w-8 h-8 bg-gray-200 rounded cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td className="p-4 font-semibold text-black/65">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 font-medium cursor-pointer"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ========================= */}
          {/* Mobile Cards */}
          {/* ========================= */}
          <div className="md:hidden space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow rounded-xl p-4 flex gap-4"
              >
                <Link to={`/productDetails/${item.id}`}>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                </Link>

                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{item.title}</h3>

                  <p className="text-gray-500 text-sm mt-1">
                    Price: ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="w-8 h-8 bg-gray-200 rounded cursor-pointer"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="w-8 h-8 bg-gray-200 rounded cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm mt-3 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
