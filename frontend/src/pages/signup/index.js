import React, { useState } from "react";
import { Backend_URL } from "../../utils/constants";
// import Image from "next/image";
const avatars = [
  "https://robohash.org/sintessequaerat.png?size=50x50&set=set1",
  "https://robohash.org/temporibusporrolaboriosam.png?size=50x50&set=set1",
  "https://robohash.org/laboriosamdolorepossimus.png?size=50x50&set=set1",
  "https://robohash.org/utquirepudiandae.png?size=50x50&set=set1",
  "https://robohash.org/praesentiumquasicorporis.png?size=50x50&set=set1",
  "https://robohash.org/occaecatinihilquos.png?size=50x50&set=set1",
  "https://robohash.org/commodiestvoluptatem.png?size=50x50&set=set1",
  "https://robohash.org/cumquenoncommodi.png?size=50x50&set=set1",
  "https://robohash.org/architectoomnisquia.png?size=50x50&set=set1",
  "https://robohash.org/delectusconsectetursed.png?size=50x50&set=set1",
  "https://robohash.org/dolorumvelitquam.png?size=50x50&set=set1",
  "https://robohash.org/eumdelectusducimus.png?size=50x50&set=set1",
  "https://robohash.org/veniamenimlaborum.png?size=50x50&set=set1",
  "https://robohash.org/totamsuntrem.png?size=50x50&set=set1",
  "https://robohash.org/voluptasipsaquam.png?size=50x50&set=set1",
];
const domainOptions = [
  "Business Development",
  "Finance",
  "IT",
  "Management",
  "Marketing",
  "UI Designing",
  "Sales",
];

const SignupForm = () => {
  // State for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    domain: domainOptions[0], // Default to the first domain option
    avatar: avatars[0], // Default to the first avatar
    available: false,
    role: "",
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the POST request to the signup endpoint
      const response = await axios.post(`${Backend_URL}/api/users/signup`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        gender: formData.gender,
        domain: formData.domain,
        avatar: formData.avatar,
        available: formData.available,
        role: formData.role,
      });

      // Handle response data or success here
      console.log(response.data);
      alert("Signup successful!");
    } catch (error) {
      // Handle errors here, e.g., display an error message
      console.error("Signup failed:", error.response.data);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full space-y-4 bg-gray-700 p-6 rounded-lg"
      >
        <div className="text-center text-2xl font-bold text-white">Sign Up</div>
        {/* Input fields */}
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="block w-full p-2 rounded bg-white text-gray-900"
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="block w-full p-2 rounded bg-white text-gray-900"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="block w-full p-2 rounded bg-white text-gray-900"
        />
        {/* Avatar selection */}
        <select
          name="domain"
          value={formData.domain}
          onChange={handleChange}
          className="block w-full p-2 rounded bg-white text-gray-900"
        >
          {domainOptions.map((domain, index) => (
            <option key={index} value={domain}>
              {domain}
            </option>
          ))}
        </select>
        <div className="flex justify-center my-4">
          <img
            src={formData.avatar}
            alt="Avatar"
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>
        <select
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
          className="block w-full p-2 rounded bg-white text-gray-900"
        >
          {avatars.map((avatar, index) => (
            <option key={index} value={avatar}>
              Avatar {index + 1}
            </option>
          ))}
        </select>
        {/* Availability checkbox */}
        <label className="block">
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
            className="mr-2 rounded"
          />
          <span className="text-white">Available</span>
        </label>
        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
