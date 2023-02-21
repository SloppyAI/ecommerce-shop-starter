/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DBUser = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    fetch('http://localhost:8000/user')
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setUsers(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const Delete = (id) => {
    if (window.confirm('Delete the user ?')) {
      fetch('http://localhost:8000/user/' + id, {
        method: 'DELETE',
      })
        .then((res) => {
          alert('Delete user successful');
          fetchUser();
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
          <h2 className="font-semibold text-2xl">User List</h2>
        </div>
        <div className="container mx-auto ">
          <table className="w-full my-4">
            <thead className="bg-gray-500 text-white">
              <tr className="text-center">
                <td>ID</td>
                <td>Name</td>
                <td>Email</td>
                <td>Role</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody className="text-center">
              {users &&
                users.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b-2 border-gray-300 py-2 h-[70px]"
                  >
                    <td>{item.id}</td>
                    <td>{item.user}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <td>
                      <a
                        onClick={() => {
                          Delete(item.id);
                        }}
                        className="py-2 px-4 mr-2 rounded-lg bg-red-500 text-white cursor-pointer"
                      >
                        Delete
                      </a>
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

export default DBUser;
