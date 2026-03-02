import React, { useContext } from "react";
import { washListContext } from "../Context/WashlistContext";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { cartContext } from "../Context/CartContext";

export default function Washlist() {
  const { removeFromWishlist, washlistItem, clearWishlist } =
    useContext(washListContext);

  const { addToCart } = useContext(cartContext);

  return (
    <section>
      <div className="container mx-auto p-5 mt-16 max-w-6xl">
        <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default p-5">
          {/* Header */}
          <div className="flex justify-between items-center mb-5 ">
            <h1 className="text-2xl font-semibold text-[#076b5e] ">
              Wishlist:{" "}
              <span className="text-orange-500/85 font-normal">
                {washlistItem.length}
              </span>{" "}
            </h1>

            {washlistItem.length > 0 && (
              <button
                onClick={clearWishlist}
                className="bg-red-500/90 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Clear Wishlist
              </button>
            )}
          </div>

          {washlistItem.length === 0 ? (
            <p className="text-center py-10">Your wishlist is empty</p>
          ) : (
            <>
              <table className="w-full text-sm text-left text-body">
                <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
                  <tr>
                    <th className="px-4 py-3">Image</th>
                    <th className="px-6 py-3 font-medium">Product</th>
                    <th className="px-6 py-3 font-medium">Price</th>
                    <th className="px-6 py-3 font-medium">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {washlistItem.map((item) => (
                    <tr
                      key={item.id}
                      className="bg-neutral-primary-soft border-b border-default"
                    >
                      <td className="p-4">
                        <Link to={`/productDetails/${item.id}`}>
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-20 md:w-40 rounded"
                          />
                        </Link>
                      </td>

                      <td className="px-6 py-4 font-semibold text-black/65">
                        {item.title}
                      </td>

                      <td className="px-6 py-4 font-semibold text-black/65">
                        ${item.price}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-6">
                          {/* Add to Cart */}
                          <button
                            onClick={() => addToCart(item)}
                            className="text-green-600 hover:text-green-500 transition"
                          >
                            <FaCartShopping className="text-xl cursor-pointer" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            className="text-red-600 hover:text-red-500 transition"
                          >
                            <MdDelete className="text-xl cursor-pointer" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
