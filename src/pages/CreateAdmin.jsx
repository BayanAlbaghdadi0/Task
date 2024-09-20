import React, { useState, useEffect } from "react";
import { Nav } from "../Layout/Nav";

export const CreateAdmin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    city_id: "",
    role_id: "2", // Admin role
    name_ar: "",
    name_en: "",
    phone_number: "",
    email: "",
    gender: "",
    birth_date: "",
    clinic_id: "",
    specialization_id: "",
    description: "",
  });
  const [cities, setCities] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [message, setMessage] = useState({ type: "", content: "" });
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citiesRes, clinicsRes, specializationsRes, permissionsRes] =
          await Promise.all([
            fetch("https://medical-clinic.serv00.net/api/city", {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }),
            fetch("https://medical-clinic.serv00.net/api/clinic", {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }),
            fetch("https://medical-clinic.serv00.net/api/specialization", {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }),
            fetch("https://medical-clinic.serv00.net/api/permissions/admin", {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }),
          ]);

        if (!citiesRes.ok || !clinicsRes.ok || !specializationsRes.ok) {
          throw new Error("");
        }

        const citiesData = await citiesRes.json();
        const clinicsData = await clinicsRes.json();
        const specializationsData = await specializationsRes.json();
        const permissionsData = await permissionsRes.json();
        console.log(
          citiesData.data,
          clinicsData.data,
          specializationsData.data
        );
        setCities(citiesData.data);
        setClinics(clinicsData.data);
        setSpecializations(specializationsData.data);
        setPermissions(permissionsData.data.slice(4, 8)); // Assuming the permissions are in data
      } catch (error) {
        console.error(error);
        setMessage({ type: "error", content: "faild to fetch data" });
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (e) => {
    setFormData((prevData) => ({ ...prevData, birth_date: e.target.value }));
  };
  // const handlePermissionChange = (e) => {
  //   const { value, checked } = e.target;
  //   if (checked) {
  //     setSelectedPermissions((prev) => [...prev, value]);
  //   } else {
  //     setSelectedPermissions((prev) => prev.filter((perm) => perm !== value));
  //   }
  // };
  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedPermissions((prev) => [...prev, value]);
    } else {
      setSelectedPermissions((prev) => prev.filter((perm) => perm !== value));
    }
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      const payload = { ...formData, permissions: [selectedPermissions] };
      const response = await fetch(
        "https://medical-clinic.serv00.net/api/actor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(payload),
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        setMessage({ type: "success", content: "تم إنشاء المسؤول بنجاح" });
        setFormData({
          username: "",
          password: "",
          city_id: "",
          role_id: "2",
          name_ar: "",
          name_en: "",
          phone_number: "",
          email: "",
          gender: "",
          birth_date: "",
          clinic_id: "",
          specialization_id: "",
          description: "",
        });
      } else {
        throw new Error(responseData.message || "فشل في إنشاء المسؤول");
      }
    } catch (error) {
      setMessage({ type: "error", content: error.message });
    }
  };

  return (
    <div className="max-w-5xl mx-auto  p-8 shadow-lg rounded-lg bg-gradient-to-tr from-sky-300 via-sky-900 to-sky-500 ">
      <Nav/>
      <h2 className="text-2xl font-bold mb-6 mt-4 text-center">Create New Admin </h2>
      {message.content && (
        <div
          className={`message ${message.type} mb-4 p-4 rounded-lg bg-slate-900 text-center`}
        >
          {message.content}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 w-2/3 m-auto text-white "
      >
        <div>
          <label htmlFor="username" className="block text-lg ">
            User name
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-lg ">
            password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="city_id" className="block text-lg ">
            city:
          </label>
          <select
            id="city_id"
            name="city_id"
            value={formData.city_id}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border bg-transparent border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option className="bg-black" value="">
              {" "}
              citys
            </option>
            {cities.map((city) => (
              <option className=" text-black" key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="name_ar" className="block text-lg ">
            AR user name:
          </label>
          <input
            type="text"
            id="name_ar"
            name="name_ar"
            value={formData.name_ar}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border bg-transparent border-gray-300 rounded-md shadow-sm focus:outline-none transation-all focus:ring-indigo-500 focus:border-indigo-900"
          />
        </div>

        <div>
          <label htmlFor="name_en" className="block text-lg ">
            EN user name:
          </label>
          <input
            type="text"
            id="name_en"
            name="name_en"
            value={formData.name_en}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border bg-transparent border-gray-300 rounded-md shadow-sm focus:outline-none transation-all focus:ring-indigo-500 focus:border-indigo-900"
          />
        </div>

        <div>
          <label htmlFor="phone_number" className="block text-lg ">
            phon number:
          </label>
          <input
            type="tel"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border bg-transparent border-gray-300 rounded-md shadow-sm focus:outline-none transation-all focus:ring-indigo-500 focus:border-indigo-900"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-lg ">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border bg-transparent border-gray-300 rounded-md shadow-sm focus:outline-none transation-all focus:ring-indigo-500 focus:border-indigo-900"
          />
        </div>

        <div>
          <label htmlFor="gender" className="block text-lg ">
            Gender:
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border bg-transparent border-gray-300 rounded-md shadow-sm focus:outline-none transation-all focus:ring-indigo-500 focus:border-indigo-900"
          >
            <option className=" text-black" value="">
              Gender{" "}
            </option>
            <option className=" text-black" value="1">
              male
            </option>
            <option className=" text-black" value="2">
              Female
            </option>
          </select>
        </div>

        <div>
          <label htmlFor="birth_date" className="block text-lg ">
            birth date:
          </label>
          <input
            type="date"
            id="birth_date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleDateChange}
            required
            className="mt-1 p-2 w-full border bg-transparent border-gray-300 rounded-md shadow-sm focus:outline-none transation-all focus:ring-indigo-500 focus:border-indigo-900"
          />
        </div>

        <div>
          <label htmlFor="clinic_id" className="block text-lg ">
            العيادة:
          </label>
          <select
            id="clinic_id"
            name="clinic_id"
            value={formData.clinic_id}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border bg-transparent border-gray-300 rounded-md shadow-sm focus:outline-none transation-all focus:ring-indigo-500 focus:border-indigo-900"
          >
            <option className=" text-black" value="">
              اختر العيادة
            </option>
            {clinics.map((clinic) => (
              <option className=" text-black" key={clinic.id} value={clinic.id}>
                {clinic.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="specialization_id"
            className="block text-sm font-medium text-gray-700"
          >
            التخصص:
          </label>
          <select
            id="specialization_id"
            name="specialization_id"
            value={formData.specialization_id}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border bg-transparent border-gray-300 rounded-md shadow-sm focus:outline-none transation-all focus:ring-indigo-500 focus:border-indigo-900"
          >
            <option className=" text-black" value="">
              اختر التخصص
            </option>
            {specializations.map((specialization) => (
              <option
                className=" text-black"
                key={specialization.id}
                value={specialization.id}
              >
                {specialization.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Discraption:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border bg-transparent border-gray-300 rounded-md shadow-sm focus:outline-none transation-all focus:ring-indigo-500 focus:border-indigo-900"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-900">
            Permissions:
          </label>
          <div className="space-y-2 space-x-2 text-slate-900">
            {permissions.map((perm) => (
              <label key={perm.id}>
                <input
                  type="checkbox"
                  value={perm.id}
                  onChange={handlePermissionChange}
                />
                {perm.name}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          إنشاء المسؤول
        </button>
      </form>
    </div>
  );
};
