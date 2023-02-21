import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const DBEditCategory = () => {
  const { id } = useParams();
  //   const [product, setProduct] = useState({});

  useEffect(() => {
    console.log('id: ', id);
    fetch('http://localhost:8000/category/' + id)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        console.log('product: ', resp);
        setCategoryId(resp.id);
        setCategoryName(resp.categoryName);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { id, categoryName };
    fetch('http://localhost:8000/category/' + id, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => {
        alert('Update category successful');
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
                <h3>Edit Category</h3>
              </div>
              <div className="p-4 my-4 border border-gray-500 rounded-xl max-w-2xl">
                <div className="row text-start">
                  <div className="w-full mb-4">
                    <div className="">
                      <label>Category Id</label>
                      <input
                        className="p-2 bg-gray-400 border border-gray-400 rounded-lg w-full"
                        value={categoryId}
                        disabled="disabled"
                      ></input>
                    </div>
                  </div>

                  <div className="mb-4">
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
                        Update
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

export default DBEditCategory;
