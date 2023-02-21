/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DBCreateProduct = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/category')
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setCategories(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // fetch Categories

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, image, category, price };
    fetch('http://localhost:8000/product', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => {
        alert('Added new product successful');
        navigate('/dashboard/product');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div>
      <div className="row">
        <div className="">
          <form className="container mx-auto" onSubmit={handleSubmit}>
            <div className="">
              <div className="font-semibold text-2xl">
                <h3>Create New Product</h3>
              </div>
              <div className="p-4 my-4 border border-gray-500 rounded-xl max-w-2xl">
                <div className="row text-start">
                  <div className="w-full mb-4">
                    <div className="">
                      <label>Name</label>
                      <input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-2 border border-gray-400 rounded-lg w-full"
                      ></input>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="">
                      <label>Image</label>
                      <input
                        required
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="p-2 border border-gray-400 rounded-lg w-full"
                      ></input>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label>Category</label>
                    <select
                      className="p-2 border border-gray-400 rounded-lg w-full"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categories.map((item) => (
                        <option value={item.categoryName}>
                          {item.categoryName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* <div className="mb-4">
                    <div className="">
                      <label>Category</label>
                      <input
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="p-2 border border-gray-400 rounded-lg w-full"
                      ></input>
                    </div>
                  </div> */}

                  <div className="mb-4">
                    <div className="">
                      <label>Price</label>
                      <input
                        type="text"
                        pattern="[1-9][0-9]*"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="p-2 border border-gray-400 rounded-lg w-full"
                      ></input>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="">
                      <button
                        type="submit"
                        className="bg-blue-500 py-2 px-4 text-white rounded-xl mr-2"
                      >
                        Create
                      </button>
                      <Link to="/dashboard/product">
                        <button
                          type="submit"
                          className="bg-red-500 py-2 px-4 text-white rounded-xl"
                        >
                          Back
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DBCreateProduct;
