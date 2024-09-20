import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get admin_id from URL
import { Nav } from "../Layout/Nav";

export const AdminDetails = () => {
  const { adminId } = useParams(); // Get adminId from the URL
  const [adminDetails, setAdminDetails] = useState(true);
  const [permissions, setPermissions] = useState([]);
  const [assignedPermissions, setAssignedPermissions] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const fetchPermissions = async () => {
    const res = await fetch(
      "https://medical-clinic.serv00.net/api/permissions/admin",
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    setPermissions(data.data.slice(4, 12));
  };

  fetchPermissions();

  const handlePermissionChange = (permissionId, isChecked) => {
    if (isChecked) {
      setAssignedPermissions([...assignedPermissions, permissionId]);
    } else {
      setAssignedPermissions(
        assignedPermissions.filter((id) => id !== permissionId)
      );
    }
  };

  // Handle form submission to update permissions
  const handleSubmitPermissions = async () => {
    try {
      const formData = new FormData();

      // Loop through assigned permissions and append them as form data fields
      assignedPermissions.forEach((permission, index) => {
        formData.append(`permissions[${index}]`, permission);
      });

      const response = await fetch(
        `https://medical-clinic.serv00.net/api/actor_permissions/${adminId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update permissions");
      }
        const newData = await response.json()
        console.log(newData);
      alert("Permissions updated successfully!");
    } catch (err) {
      setError("Failed to update permissions.");
    }
  };

  if (error) return <p>{error}</p>;
  if (!adminDetails) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <Nav />
      <h1 className="text-4xl font-bold mb-6 text-center">
        Admin Details: {adminDetails.username}
      </h1>

      {/* Permissions Section */}
      <div className="mb-6 flex justify-center items-center flex-col">
        <h2 className="text-3xl mb-4">Assign Permissions</h2>
        {permissions.length > 0 ? (
          <ul className="space-y-2">
            {permissions.map((permission) => (
              <li key={permission.id} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id={`permission-${permission.id}`}
                  checked={assignedPermissions.includes(permission.id)}
                  onChange={(e) =>
                    handlePermissionChange(permission.id, e.target.checked)
                  }
                />
                <label htmlFor={`permission-${permission.id}`}>
                  {permission.name}
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <p>No available permissions found.</p>
        )}

        {/* Submit button to update permissions */}
        <button
          onClick={handleSubmitPermissions}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Submit Permissions
        </button>
      </div>
    </div>
  );
};
