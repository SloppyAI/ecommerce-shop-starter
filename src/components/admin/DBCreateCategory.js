/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DBCreateCategory = () => {
  const [id, setId] = useState('');
  const [categoryName, setCategoryName] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { categoryName };
    fetch('http://localhost:8000/category', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => {
        alert('Added new category successful');
        navigate('/dashboard/category');
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
                <h3>Create New Category</h3>
              </div>
              <div className="p-4 my-4 border border-gray-500 rounded-xl max-w-2xl">
                <div className="row text-start">
                  <div className="w-full mb-4">
                    <div className="">
                      <label>Name</label>
                      <input
                        required
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
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
                      <Link to="/dashboard/category">
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

export default DBCreateCategory;
