import React, { useEffect, useState } from "react";
import { Nav } from "../Layout/Nav";
import { Link } from "react-router-dom";
export const Dashboard = () => {
  const [clinics, setClinics] = useState([]);
  const [admins, setAdmins] = useState([]); // State for storing admins
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://medical-clinic.serv00.net/api/clinic",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              language: "en",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setClinics(data.data);
        setLoading(false);
      } catch (error) {
        setError("Something went wrong. Please try again later.");
      }
    };

    const fetchAdmins = async () => {
      try {
        const response = await fetch(
          "https://medical-clinic.serv00.net/api/actor?role_id=2",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              language: "en",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch admins");
        }
        const adminData = await response.json();
        setAdmins(adminData.data);
      } catch (error) {
        setError("Failed to fetch admins.");
      }
    };

    fetchClinics();
    fetchAdmins(); // Fetch the admins as well
  }, [token]);

  return (
    <div>
      <Nav />
      <h1 className="text-4xl bg-gradient-to-tl text-center leading-relaxed from-indigo-600 to-sky-500 bg-clip-text text-transparent">
        Welcome Again Sir!
      </h1>

      <div className="flex justify-center items-center">
        {error && <p className="text-red-500">{error}</p>}
        {loading && <span className="loading loading-ring w-72 "></span>}
      </div>

      {/* Clinic Table */}
      <div className="overflow-x-auto">
        <h1 className="text-3xl font-bold text-center mb-4">Clinics</h1>
        <table className="table">
          <thead className="font-extrabold">
            <tr>
              <th className="font-black text-2xl text-center ">Id</th>
              <th className="font-black text-2xl text-center">Name (EN)</th>
              <th className="font-black text-2xl text-center">Phone Number</th>
              <th className="font-black text-2xl text-center">URL Name</th>
              <th className="font-black text-2xl text-center">Status</th>
              <th className="font-black text-2xl text-center">Created By</th>
              <th className="font-black text-2xl text-center">City</th>
            </tr>
          </thead>
          <tbody>
            {clinics.map((clinic) => (
              <tr key={clinic.id}>
                <td className="text-center">{clinic.id}</td>
                <td className="text-center">{clinic.name}</td>
                <td className="text-center">
                  {clinic.phone_number ? clinic.phone_number : "N/A"}
                </td>
                <td className="text-center">{clinic.url_name}</td>
                <td className="text-center">
                  {clinic.is_active ? "Active" : "Inactive"}
                </td>
                <td className="text-center">{clinic.created_by}</td>
                <td className="text-center">
                  <button className="btn btn-ghost btn-xs">
                    {clinic.city_id?.name || "N/A"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Admin Table */}
      <div className="overflow-x-auto mt-8">
        <h2 className="text-3xl font-bold text-center mb-4">Admins</h2>
        <p className="text-center">click on admin name to give hem a paramitiones</p>
        <table className="table">
          <thead className="font-extrabold">
            <tr>
              <th className="font-black text-2xl text-center">Id</th>
              <th className="font-black text-2xl text-center">Username</th>
              <th className="font-black text-2xl text-center">Email</th>
              <th className="font-black text-2xl text-center">Phone Number</th>
            </tr>
          </thead>
          <tbody>
          {admins.map((admin) => (
              <tr key={admin.id}>
                <td className="text-center">
                  <Link to={`/admin/${admin.id}`}>{admin.id}</Link>
                </td>
                <td className="text-center">
                  <Link to={`/admin/${admin.id}`}>{admin.username}</Link>
                </td>
                <td className="text-center">{admin.details.email || "N/A"}</td>
                <td className="text-center">{admin.details.phone_number || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};