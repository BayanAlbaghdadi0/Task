import React, { useState, useEffect } from "react";
import { Nav } from "../Layout/Nav";

export const CreateClinic = () => {
  const [success, setSuccess] = useState(false);
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [cityId, setCityId] = useState("1");
  const [addressAr, setAddressAr] = useState("");
  const [addressEn, setAddressEn] = useState("");
  const [urlName, setUrlName] = useState("");
  const [color, setColor] = useState("");
  const [requirements, setRequirements] = useState([]);
  const [contactInfos, setContactInfos] = useState({});
  console.log(contactInfos);
  const [selectedTypes, setSelectedTypes] = useState([]); //
  const [logo, setLogo] = useState(null);
  const [cities, setCities] = useState([]);
  const [availableRequirements, setAvailableRequirements] = useState([]);
  const [communicationTypes, setCommunicationTypes] = useState([]);
  console.log(availableRequirements);

  // Fetch data
  useEffect(() => {
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    fetch("https://medical-clinic.serv00.net/api/city", { headers })
      .then((response) => response.json())
      .then((data) => setCities(data.data))
      .catch((error) => console.error(error));

    fetch("https://medical-clinic.serv00.net/api/requirement", { headers })
      .then((response) => response.json())
      .then((data) => setAvailableRequirements(data.data))
      .catch((error) => console.error(error));

    fetch("https://medical-clinic.serv00.net/api/communication_types/all", {
      headers,
    })
      .then((response) => response.json())
      .then((data) => setCommunicationTypes(data.data))
      .then((data) => console.log(communicationTypes))
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure city_id is a number and requirements are sent as IDs
    const formData = new FormData();
    formData.append("name_ar", nameAr);
    formData.append("name_en", nameEn);
    formData.append("city_id", parseInt(cityId)); // Ensure city_id is a number
    formData.append("address_ar", addressAr);
    formData.append("address_en", addressEn);
    formData.append("url_name", urlName);
    formData.append("color", color);
    formData.append("logo", logo);

    // Send requirements as IDs
    requirements.forEach((req, index) => {
      formData.append(`requirements[${index}]`, req); // Ensure the correct value is sent
    });

    // Send contactInfos in the expected format
    Object.keys(contactInfos).forEach((key) => {
      formData.append(`contactInfos[${key}][value]`, contactInfos[key].value);
    });

    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    fetch("https://medical-clinic.serv00.net/api/clinic", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    }) .then((response) => {
      if (response.status === 201) {
        return response.json(); // Try to parse the JSON response if present
      } else {
        throw new Error("Failed to create clinic");
      }
    })
    .then((data) => {
      setSuccess(true); // Handle success
      console.log("Clinic created", data);
    })
      .catch((error) => console.error("Error:", error));
  };

  const handleCheckboxChange = (typeId) => {
    if (selectedTypes.includes(typeId)) {
      setSelectedTypes(selectedTypes.filter((id) => id !== typeId));
      setContactInfos((prevInfos) => {
        const newInfos = { ...prevInfos };
        delete newInfos[typeId];
        return newInfos;
      });
    } else {
      setSelectedTypes([...selectedTypes, typeId]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4  mt-4  ">
      <Nav/>
      <h1 className="text-4xl bg-gradient-to-tl text-center leading-relaxed from-indigo-600 to-sky-500 bg-clip-text text-transparent ">
        Create Clinic
      </h1>
      {success && (
        <div role="alert" className="alert alert-success alert-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Your Clinic has been Created!</span>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  w-1/2 gap-4  rounded-md drop-shadow-xl"
      >
        <div className="flex gap-4 flex-col md:flex-row md:gap-8 ">
          <input
            type="text"
            placeholder="Name in Arabic"
            value={nameAr}
            onChange={(e) => setNameAr(e.target.value)}
            className="input input-bordered input-info  w-full max-w-xs"
          />
          <input
            type="text"
            placeholder="Name in English"
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            className="input input-bordered input-info w-full max-w-xs"
          />
        </div>
        <div className="flex gap-4 flex-col md:flex-row md:gap-8">
          <select
            value={cityId}
            onChange={(e) => setCityId(e.target.value)}
            className="select select-info w-full max-w-xs"
          >
            <option disabled>Select City</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Arabic Address"
            value={addressAr}
            onChange={(e) => setAddressAr(e.target.value)}
            className="input input-bordered input-info w-full max-w-xs"
          />
        </div>
        <div className="flex gap-4 flex-col md:flex-row md:gap-8">
          <input
            type="text"
            placeholder="English Address"
            value={addressEn}
            onChange={(e) => setAddressEn(e.target.value)}
            className="input input-bordered input-info w-full max-w-xs"
          />
          <input
            type="text"
            placeholder="URL Name"
            value={urlName}
            onChange={(e) => setUrlName(e.target.value)}
            className="input input-bordered input-info w-full max-w-xs"
          />
        </div>
        <input
          type="color"
          placeholder="Color"
          value={color}
          //   defaultValue={"#f87171"}
          onChange={(e) => setColor(e.target.value)}
          className="input input-bordered input-info w-full "
        />

        {/* Contact Information */}
        <h4 className="text-xl text-center">Contact Information</h4>
        <div className="flex flex-col md:flex-row flex-wrap gap-4 justify-center">
          {communicationTypes.map((type) => (
            <div key={type.id} className="flex items-center gap-2 ">
              <input
                type="checkbox"
                id={`type-${type.id}`}
                onChange={() => handleCheckboxChange(type.id)}
              />
              <label htmlFor={`type-${type.id}`}>{type.name}</label>

              {selectedTypes.includes(type.id) && (
                <input
                  type="text"
                  placeholder={`Enter ${type.name}`}
                  value={contactInfos[type.id]?.value || ""}
                  onChange={(e) =>
                    setContactInfos({
                      ...contactInfos,
                      [type.id]: { value: e.target.value },
                    })
                  }
                  className="input input-bordered input-info w-full max-w-xs"
                />
              )}
            </div>
          ))}
        </div>

        {/* Requirements */}
        <h4 className="text-xl text-center">Select Requirements</h4>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          {availableRequirements.map((requirement) => (
            <label key={requirement.id} className="inline-flex ">
              <input
                className="mx-2"
                type="checkbox"
                value={requirement.id}
                onChange={(e) => {
                  if (e.target.checked) {
                    setRequirements([...requirements, e.target.value]);
                  } else {
                    setRequirements(
                      requirements.filter((r) => r !== e.target.value)
                    );
                  }
                }}
              />
              {requirement.name}
            </label>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="file"
            className="file-input file-input-bordered file-input-info w-1/2 "
            onChange={(e) => setLogo(e.target.files[0])}
          />

          <button className="btn btn-outline btn-info w-1/2" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
