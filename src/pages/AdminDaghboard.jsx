import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = 'https://medical-clinic.serv00.net/api/';

const fetchActors = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token not found');
  }
  try {
    const response = await axios.get(`${apiUrl}actor?role_id=1`, {
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      throw new Error('You do not have permission to view actors');
    }
    console.error('Error fetching actors:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const AdminDashboard = () => {
  const [actors, setActors] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    city_id: '',
    role_id: '',
    name_ar: '',
    name_en: '',
    phone_number: '',
    email: '',
    gender: '',
    birth_date: '',
    clinic_id: '',
    specialization_id: '',
    description: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadActors = async () => {
      try {
        const actorsData = await fetchActors();
        setActors(actorsData);
      } catch (err) {
        setError(err.message);
      }
    };
    loadActors();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${apiUrl}actor`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Reload actors after successful creation
      const actorsData = await fetchActors();
      setActors(actorsData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${apiUrl}actor/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Reload actors after successful deletion
      const actorsData = await fetchActors();
      setActors(actorsData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id) => {
    // Assuming you have a form to edit actor details
    const token = localStorage.getItem('token');
    try {
      await axios.put(`${apiUrl}actor/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Reload actors after successful update
      const actorsData = await fetchActors();
      setActors(actorsData);
    } catch (error) {
      console.error(error);
    }
  };

  if (error) {
    return <div className="text-red-500 text-center my-72">{error}</div>;
  }

  return (
    <div className='w-2/3 mx-auto mt-10 h-screen'>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            User name
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="city_id" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <select
            id="city_id"
            name="city_id"
            value={formData.city_id}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select city</option>
            {/* Replace with dynamic cities options */}
            <option value="1">City 1</option>
            <option value="2">City 2</option>
          </select>
        </div>
        <div>
          <label htmlFor="name_ar" className="block text-sm font-medium text-gray-700">
            AR User name
          </label>
          <input
            type="text"
            id="name_ar"
            name="name_ar"
            value={formData.name_ar}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        {/* Add other input fields similarly */}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none"
        >
          Submit
        </button>
      </form>
      <div className="overflow-x-auto mt-8">
        <h2 className="text-3xl font-bold text-center mb-4">Actors</h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="font-extrabold bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Id</th>
              <th className="border border-gray-300 px-4 py-2">Username</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone Number</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {actors.map((actor) => (
              <tr key={actor.id}>
                <td className="border border-gray-300 px-4 py-2 text-center">{actor.id}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{actor.username}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{actor.email || 'N/A'}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{actor.phone_number || 'N/A'}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => handleEdit(actor.id)}
                    className="px-2 py-1 bg-yellow-600 text-white rounded-md shadow-sm hover:bg-yellow-700 focus:outline-none"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(actor.id)}
                    className="px-2 py-1 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 focus:outline-none ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

