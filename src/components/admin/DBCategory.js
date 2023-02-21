/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DBCategory = () => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = () => {
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
  };

  const Delete = (id) => {
    if (window.confirm('Delete the category ?')) {
      fetch('http://localhost:8000/category/' + id, {
        method: 'DELETE',
      })
        .then((res) => {
          alert('Delete category successful');
          fetchCategory();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    <div className="container mx-auto">
      <div className="">
        <div className="py-4">
          <h2 className="font-semibold text-2xl">Category List</h2>
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
                <td>Name</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody className="text-center">
              {categories &&
                categories.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b-2 border-gray-300 py-2 h-[70px]"
                  >
                    <td>{item.id}</td>
                    <td>{item.categoryName}</td>
                    <td>
                      <Link
                        to={`/dashboard/category/edit/${item.id}`}
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
                        to={`/dashboard/category/detail/${item.id}`}
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

export default DBCategory;
