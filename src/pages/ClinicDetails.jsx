import React, { useEffect, useState } from "react";

export const ClinicDetails = ({ clinicId }) => {
  const [clinic, setClinic] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [updateData, setUpdateData] = useState({
    name_ar: "",
    name_en: "",
    address_ar: "",
    address_en: "",
    telephone: "",
    url_name: "",
    color: "",
  });

  useEffect(() => {
    const fetchClinicDetails = async () => {
      try {
        const response = await fetch(
          `https://medical-clinic.serv00.net/api/clinic/${clinicId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setClinic(data.data);
          setUpdateData({
            name_ar: data.data.name_ar,
            name_en: data.data.name_en,
            address_ar: data.data.address_ar || "",
            address_en: data.data.address_en || "",
            telephone: data.data.telephone || "",
            url_name: data.data.url_name || "",
            color: data.data.color || "",
          });
        } else {
          setError("Failed to fetch clinic details");
        }
      } catch (error) {
        setError("Error fetching clinic details");
      } finally {
        setLoading(false);
      }
    };

    fetchClinicDetails();
  }, [clinicId]);

  const toggleActiveStatus = async () => {
    try {
      const response = await fetch(
        `https://medical-clinic.serv00.net/api/clinic/active/${clinicId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setIsActive(data.data.is_active);
      } else {
        setError("Failed to update clinic status");
      }
    } catch (error) {
      setError("Error updating clinic status");
    }
  };

  const updateClinicDetails = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://medical-clinic.serv00.net/api/clinic/${clinicId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, //
          },
          body: JSON.stringify(updateData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setClinic(data.data);
        alert("Clinic details updated successfully");
      } else {
        setError("Failed to update clinic details");
      }
    } catch (error) {
      setError("Error updating clinic details");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Clinic Details</h1>
      <p>Arabic Name: {clinic.name_ar}</p>
      <p>English Name: {clinic.name_en}</p>
      <p>
        Address: {clinic.address_ar} / {clinic.address_en}
      </p>
      <p>Telephone: {clinic.telephone}</p>
      <p>URL Name: {clinic.url_name}</p>
      <p>Color: {clinic.color}</p>
      <p>Status: {clinic.is_active ? "Active" : "Inactive"}</p>
      <button onClick={toggleActiveStatus}>
        {isActive ? "Deactivate Clinic" : "Activate Clinic"}
      </button>

      <h2>Update Clinic Details</h2>
      <form onSubmit={updateClinicDetails}>
        <div>
          <label>Arabic Name</label>
          <input
            type="text"
            value={updateData.name_ar}
            onChange={(e) =>
              setUpdateData({ ...updateData, name_ar: e.target.value })
            }
          />
        </div>
        <div>
          <label>English Name</label>
          <input
            type="text"
            value={updateData.name_en}
            onChange={(e) =>
              setUpdateData({ ...updateData, name_en: e.target.value })
            }
          />
        </div>
        <div>
          <label>Arabic Address</label>
          <input
            type="text"
            value={updateData.address_ar}
            onChange={(e) =>
              setUpdateData({ ...updateData, address_ar: e.target.value })
            }
          />
        </div>
        <div>
          <label>English Address</label>
          <input
            type="text"
            value={updateData.address_en}
            onChange={(e) =>
              setUpdateData({ ...updateData, address_en: e.target.value })
            }
          />
        </div>
        <div>
          <label>Telephone</label>
          <input
            type="text"
            value={updateData.telephone}
            onChange={(e) =>
              setUpdateData({ ...updateData, telephone: e.target.value })
            }
          />
        </div>
        <div>
          <label>URL Name</label>
          <input
            type="text"
            value={updateData.url_name}
            onChange={(e) =>
              setUpdateData({ ...updateData, url_name: e.target.value })
            }
          />
        </div>
        <div>
          <label>Color</label>
          <input
            type="text"
            value={updateData.color}
            onChange={(e) =>
              setUpdateData({ ...updateData, color: e.target.value })
            }
          />
        </div>
        <button type="submit">Update Clinic</button>
      </form>
    </div>
  );
};
