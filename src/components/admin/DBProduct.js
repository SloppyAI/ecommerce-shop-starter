/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DBProduct = () => {
  const [products, setProducts] = useState(null);

  const Delete = (id) => {
    if (window.confirm('Delete the product ?')) {
      fetch('http://localhost:8000/product/' + id, {
        method: 'DELETE',
      })
        .then((res) => {
          alert('Delete product successful');
          fetchProduct();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = () => {
    fetch('http://localhost:8000/product')
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setProducts(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="container mx-auto">
      <div className="">
        <div className="py-4">
          <h2 className="font-semibold text-2xl">Product List</h2>
        </div>
        <div className="container mx-auto ">
          <div className="float-start mb-2">
            <Link
              to="create"
              className="p-2 rounded-lg bg-green-500 text-white"
            >
              Add New +
            </Link>
          </div>
          <table className="w-full my-4">
            <thead className="bg-gray-500 text-white">
              <tr className="text-center">
                <td>ID</td>
                <td>Image</td>
                <td>Name</td>
                <td>Category</td>
                <td>Price</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody className="text-center">
              {products &&
                products.map((item) => (
                  <tr key={item.id} className="border-b-2 border-gray-300">
                    <td>{item.id}</td>
                    <td>
                      <img
                        src={item.image}
                        alt=""
                        className="max-w-[160px] min-h-[160px] mx-auto"
                        loading="lazy"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.price}$</td>
                    <td>
                      <Link
                        to={`/dashboard/product/edit/${item.id}`}
                        className="py-2 px-4 mr-2 rounded-lg bg-blue-500 text-white cursor-pointer"
                      >
                        Edit
                      </Link>
                      <a
                        onClick={() => {
                          Delete(item.id);
                        }}
                        className="py-2 px-4 mr-2 rounded-lg bg-red-500 text-white cursor-pointer"
                      >
                        Delete
                      </a>
                      <Link
                        to={`/dashboard/product/detail/${item.id}`}
                        className="py-2 px-4 mr-2 rounded-lg bg-green-500 text-white cursor-pointer"
                      >
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DBProduct;
