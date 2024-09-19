import React, { useEffect, useState } from "react";

export const ClinicsList = () => {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await fetch(`https://medical-clinic.serv00.net/api/clinic`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, //   
          },
        });
        const data = await response.json();
        if (response.ok) {
          setClinics(data.data); //
        } else {
          setError("Failed to fetch clinics");
        }
      } catch (error) {
        setError("Error fetching clinics");
      } finally {
        setLoading(false);
      }
    };

    fetchClinics();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>All Clinics</h1>
      <ul>
        {clinics.map((clinic) => (
          <li key={clinic.id}>
            <h2>{clinic.name_en} ({clinic.name_ar})</h2>
            <p>Address: {clinic.address_en || clinic.address_ar}</p>
            <p>Status: {clinic.is_active ? "Active" : "Inactive"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};


