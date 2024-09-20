import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const apiUrl = "https://medical-clinic.serv00.net/api/";

export const AdminDashboard = () => {
  const { user } = useAuth(); // Get the logged-in user's data from the context
  const [clinic, setClinic] = useState(null); // Store clinic information
  const [updateData, setUpdateData] = useState({
    name_ar: "",
    name_en: "",
    address_ar: "",
    address_en: "",
    telephone: "",
    url_name: "",
    color: "",
  });
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const clinicId = user?.details?.clinic_id || null; // Get clinic_id from the logged-in user

  useEffect(() => {
    const fetchClinicDetails = async () => {
      if (!clinicId) return;
      try {
        const response = await axios.get(`${apiUrl}clinic/${clinicId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = response.data;
        setClinic(data.data);
        setUpdateData({
          name_ar: data.data.name_ar || "",
          name_en: data.data.name_en || "",
          address_ar: data.data.address_ar || "",
          address_en: data.data.address_en || "",
          telephone: data.data.telephone || "",
          url_name: data.data.url_name || "",
          color: data.data.color || "",
        });
        setIsActive(data.data.is_active);
      } catch (err) {
        setError("Failed to fetch clinic details.");
      } finally {
        setLoading(false);
      }
    };
    fetchClinicDetails();
  }, [clinicId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const updateClinicDetails = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${apiUrl}clinic/${clinicId}`, updateData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setClinic(response.data.data);
      alert("Clinic details updated successfully");
    } catch (err) {
      setError("Error updating clinic details.");
    }
  };

  const toggleActiveStatus = async () => {
    try {
      const response = await axios.get(`${apiUrl}clinic/active/${clinicId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setIsActive(response.data.data.is_active);
    } catch (err) {
      setError("Failed to update clinic status.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-4">
      <h1 className="text-4xl bg-gradient-to-tl text-center leading-relaxed from-indigo-600 to-sky-500 bg-clip-text text-transparent">
        Update Clinic Details
      </h1>
      {clinic && (
        <form
          onSubmit={updateClinicDetails}
          className="flex flex-col w-1/2 gap-4 rounded-md drop-shadow-xl"
        >
          <div className="flex gap-4 flex-col md:flex-row md:gap-8">
            <input
              type="text"
              placeholder="Name in Arabic"
              name="name_ar"
              value={updateData.name_ar}
              onChange={handleInputChange}
              className="input input-bordered input-info w-full max-w-xs"
            />
            <input
              type="text"
              placeholder="Name in English"
              name="name_en"
              value={updateData.name_en}
              onChange={handleInputChange}
              className="input input-bordered input-info w-full max-w-xs"
            />
          </div>
          <div className="flex gap-4 flex-col md:flex-row md:gap-8">
            <input
              type="text"
              placeholder="Arabic Address"
              name="address_ar"
              value={updateData.address_ar}
              onChange={handleInputChange}
              className="input input-bordered input-info w-full max-w-xs"
            />
            <input
              type="text"
              placeholder="English Address"
              name="address_en"
              value={updateData.address_en}
              onChange={handleInputChange}
              className="input input-bordered input-info w-full max-w-xs"
            />
          </div>
          <div className="flex gap-4 flex-col md:flex-row md:gap-8">
            <input
              type="text"
              placeholder="URL Name"
              name="url_name"
              value={updateData.url_name}
              onChange={handleInputChange}
              className="input input-bordered input-info w-full max-w-xs"
            />
            <input
              type="color"
              placeholder="Color"
              name="color"
              value={updateData.color}
              onChange={handleInputChange}
              className="input input-bordered input-info w-full"
            />
          </div>
          <div>
            <label className="flex items-center">
              <span className="mr-2">Active Status:</span>
              <input
                type="checkbox"
                checked={isActive}
                onChange={toggleActiveStatus}
                className="checkbox checkbox-info"
              />
            </label>
          </div>
          <button className="btn btn-outline btn-info w-1/2" type="submit">
            Update Clinic
          </button>
        </form>
      )}
    </div>
  );
};

 