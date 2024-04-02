import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Backend_URL } from "../../utils/constants";

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
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    domain: domainOptions[0],
    avatar: avatars[0],
    available: false,
    role: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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

      console.log(response.data);
      alert("Signup successful!");
    } catch (error) {
      console.error("Signup failed:", error.response.data);
      alert("Signup failed. Please try again.");
    }
  };

  const goBack = () => {
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full space-y-4 bg-gray-700 p-6 rounded-lg"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-center text-2xl font-bold text-white">Sign Up</h2>
          <button
            type="button"
            onClick={goBack}
            className="text-white text-2xl hover:text-gray-400 focus:outline-none"
          >
            &times;
          </button>
        </div>

        <div className="flex flex-wrap justify-between">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full md:w-44 p-2 rounded bg-white text-gray-900 mb-2 md:mr-2"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full md:w-44 p-2 rounded bg-white text-gray-900 mb-2 md:ml-2"
          />
        </div>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 rounded bg-white text-gray-900 mb-2"
        />

        <div className="flex flex-wrap justify-between items-center">
          <select
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            className="w-full md:w-44 p-2 rounded bg-white text-gray-900 mb-2 md:mr-2"
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
        </div>

        <select
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white text-gray-900 mb-2"
        >
          {avatars.map((avatar, index) => (
            <option key={index} value={avatar}>
              Avatar {index + 1}
            </option>
          ))}
        </select>

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
