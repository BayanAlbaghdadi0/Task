import React, { useState, useEffect } from "react";

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
  const [message, setMessage] = useState({ type: "", content: "" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citiesRes, clinicsRes, specializationsRes] = await Promise.all([
          fetch("https://medical-clinic.serv00.net/api/city", {
            headers: { 'Accept': 'application/json',Authorization: `Bearer ${token}` }
          }),
          fetch("https://medical-clinic.serv00.net/api/clinic", {
            headers: { 'Accept': 'application/json',Authorization: `Bearer ${token}` }
          }),
          fetch("https://medical-clinic.serv00.net/api/specialization", {
            headers: { 'Accept': 'application/json',"Authorization": `Bearer ${token}` }
          })
        ]);

        if (!citiesRes.ok || !clinicsRes.ok || !specializationsRes.ok) {
          throw new Error("");
        }

        const citiesData = await citiesRes.json();
        const clinicsData = await clinicsRes.json();
        const specializationsData = await specializationsRes.json();
        console.log(citiesData.data,clinicsData.data,specializationsData.data);
        setCities(citiesData.data);
        setClinics(clinicsData.data);
        setSpecializations(specializationsData.data);
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
  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPermissions((prev) => [...prev, value]);
    } else {
      setPermissions((prev) => prev.filter((perm) => perm !== value));
    }
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      const response = await fetch(
        "https://medical-clinic.serv00.net/api/actor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const responseData = await response.json(); 
      console.log(responseData);
      if (response.ok) {
        setMessage({ type: "success", content: "تم إنشاء المسؤول بنجاح" });
        // إعادة تعيين النموذج
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
        console.error("Server Response:", responseData);
        throw new Error(responseData.message || "فشل في إنشاء المسؤول");
      }
    } catch (error) {
      setMessage({ type: "error", content: error.message });
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-slate-100 p-8 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Create New Admin </h2>
      {message.content && (
        <div
          className={`message ${message.type} mb-4 p-4 rounded-lg bg-slate-900 text-center`}
        >
          {message.content}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
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
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            password
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
          <label
            htmlFor="city_id"
            className="block text-sm font-medium text-gray-700"
          >
            city:
          </label>
          <select
            id="city_id"
            name="city_id"
            value={formData.city_id}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value=""> citys</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="name_ar"
            className="block text-sm font-medium text-gray-700"
          >
            AR user name:
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

        <div>
          <label
            htmlFor="name_en"
            className="block text-sm font-medium text-gray-700"
          >
            EN user name:
          </label>
          <input
            type="text"
            id="name_en"
            name="name_en"
            value={formData.name_en}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="phone_number"
            className="block text-sm font-medium text-gray-700"
          >
            phon number:
          </label>
          <input
            type="tel"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700"
          >
            Gender:
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Gender </option>
            <option value="1">male</option>
            <option value="2">Female</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="birth_date"
            className="block text-sm font-medium text-gray-700"
          >
            birth date:
          </label>
          <input
            type="date"
            id="birth_date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleDateChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="clinic_id"
            className="block text-sm font-medium text-gray-700"
          >
            العيادة:
          </label>
          <select
            id="clinic_id"
            name="clinic_id"
            value={formData.clinic_id}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">اختر العيادة</option>
            {clinics.map((clinic) => (
              <option key={clinic.id} value={clinic.id}>
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
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">اختر التخصص</option>
            {specializations.map((specialization) => (
              <option key={specialization.id} value={specialization.id}>
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
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Permissions:</label>
          <div className="space-y-2">
            <label>
              <input
                type="checkbox"
                value="1"
                onChange={handlePermissionChange}
              />
              Create Actor
            </label>
            <label>
              <input
                type="checkbox"
                value="2"
                onChange={handlePermissionChange}
              />
              Update Actor
            </label>
            <label>
              <input
                type="checkbox"
                value="3"
                onChange={handlePermissionChange}
              />
              Delete Actor
            </label>
            <label>
              <input
                type="checkbox"
                value="4"
                onChange={handlePermissionChange}
              />
              Show Actor
            </label>
            {/* Add more permissions as necessary */}
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
