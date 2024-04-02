import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Backend_URL } from "../utils/constants";
import axios from "axios";

function Navbar({ data }) {
  const { hasCookie, name, img } = data;
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios({
        method: "get",
        url: `${Backend_URL}/api/v1/users/logout`,
        withCredentials: true,
      });
      localStorage.removeItem("user");
      router.reload();
    } catch (error) {
      console.error("Logout failed:", error);
      router.push("/");
    }
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <div>
              <a
                href="/"
                className="flex gap-2 items-center py-5 px-2 text-gray-700"
              >
                <Image
                  src="/logo-white.png"
                  width={50}
                  height={50}
                  alt="Logo"
                />
                <span className="font-bold text-white text-lg">
                  TeamConnect
                </span>
              </a>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <a
              href="/"
              className="py-3 rounded-lg px-3 text-gray-300 hover:bg-gray-500"
            >
              Home
            </a>
            <a
              href="/teams"
              className="py-3 rounded-lg px-3 text-gray-300 hover:bg-gray-500"
            >
              Teams
            </a>
            <a
              href="/createteam"
              className="py-3 rounded-lg px-3 text-gray-300 hover:bg-gray-500"
            >
              CreateTeam
            </a>
            {hasCookie ? (
              <>
                <div href="/me" className="flex items-center py-5 px-3">
                  <img
                    src={img}
                    alt="Profile"
                    width={50}
                    height={50}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="text-gray-300  ml-3">{name}</span>
                </div>
                <a
                  onClick={handleLogout}
                  className="py-3 rounded-lg px-3 text-gray-300 hover:bg-gray-500"
                >
                  Log Out
                </a>
              </>
            ) : (
              <a
                href="/login"
                className="py-3 rounded-lg px-3 text-gray-300 hover:bg-gray-500"
              >
                Log In
              </a>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="white"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 text-white w-full absolute top-0 left-0 h-screen z-10 flex flex-col items-center justify-start pt-20">
          <a href="/" className="py-5 text-lg">
            Home
          </a>
          <a href="/teams" className="py-5 text-lg">
            Teams
          </a>
          <a href="/createteam" className="py-5 text-lg">
            CreateTeam
          </a>
          {!hasCookie ? (
            <a href="/login" className="py-5 text-lg">
              Log In
            </a>
          ) : (
            <>
              <a href="/me" className="py-5 text-lg">
                Profile
              </a>
              <a onClick={handleLogout} className="py-5 text-lg cursor-pointer">
                Log Out
              </a>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
