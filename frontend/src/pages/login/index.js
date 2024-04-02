import React, { useState } from "react";
import { useRouter } from "next/router";
import { Backend_URL } from "../../utils/constants";
import axios from "axios";

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: "Spenser",
    last_name: "Ceccoli",
    email: "sceccolipq@icio.us",
  });

  const { first_name, last_name, email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${Backend_URL}/api/users/login`,
        {
          first_name,
          last_name,
          email,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login successful", response.data);
      router.push("/");
    } catch (error) {
      console.error("Login failed", error.response.data);
    }
  };

  const goBack = () => {
    router.push("/");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-black">
      <form
        onSubmit={onSubmit}
        className="p-4 sm:p-8 md:p-10 lg:p-12 xl:p-16 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 bg-gray-800 rounded-lg"
      >
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={goBack}
            className="text-white text-2xl hover:text-gray-400 focus:outline-none"
          >
            &times;
          </button>
        </div>
        <h2 className="text-2xl font-bold text-white mb-6">Login</h2>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-white mb-2">
            First Name
          </label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            value={first_name}
            onChange={onChange}
            required
            className="w-full p-2 rounded text-gray-900"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-white mb-2">
            Last Name
          </label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            value={last_name}
            onChange={onChange}
            required
            className="w-full p-2 rounded text-gray-900"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-white mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={onChange}
            required
            className="w-full p-2 rounded text-gray-900"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#55c57a] text-white p-2 rounded hover:bg-[#1aaa4a]"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
