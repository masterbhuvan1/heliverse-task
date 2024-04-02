import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import UserCard from "@/components/UserCard";
import { Backend_URL } from "../utils/constants";
const loader = async () => {
  let img = "default.jpg";
  console.log("called");
  let name = "";
  let id = "";
  // console.info("cookie", cookieData, document.cookie.jwt);
  const configuration = {
    method: "post",
    url: `${Backend_URL}/api/users/isLoggedIn`,
    credentials: true,
    withCredentials: true,
  };
  let user;
  try {
    const response = await axios(configuration);
    console.info("called", response.data);
    img = response.data.user.avatar || "default.jpg";
    name = response.data.user.first_name;
    // id = response.data.id;
    id = response.data.user._id;
    const data = {
      hasCookie: true,
      img,
      name,
      id,
    };
    console.info("datay", data);
    return data;
  } catch (error) {
    return { hasCookie: false, img: "", name: "", id: "" };
  }
};
const Home = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    domain: [],
    gender: [],
    available: [],
  });
  const [result, setResult] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const result = await loader();
      setResult(result);
    };
    fetchData();
  }, []);
  const [loading, setLoading] = useState(false);

  const domainOptions = [
    "Business Development",
    "Finance",
    "IT",
    "Management",
    "Marketing",
    "UI Designing",
    "Sales",
  ];

  const genderOptions = [
    "Male",
    "Female",
    "Agender",
    "Bigender",
    "Polygender",
    "Genderfluid",
    "Genderqueer",
    "Non-binary",
  ];

  const availableOptions = ["Available", "Not Available"];

  useEffect(() => {
    fetchFilteredUsers();
  }, [currentPage, filters]);

  const fetchFilteredUsers = async () => {
    setLoading(true);
    let query = `${Backend_URL}/api/users?page=${currentPage}&limit=20`;

    Object.keys(filters).forEach((key) => {
      filters[key].forEach((value) => {
        if (value) {
          if (key === "available") {
            query += `&available=${value === "Available"}`;
          } else {
            query += `&${key}=${value}`;
          }
        }
      });
    });

    try {
      const response = await axios.get(query);
      setUsers(
        currentPage === 1
          ? response.data.data.data
          : [...users, ...response.data.data.data]
      );
      setLoading(false);
    } catch (error) {
      console.error("Error fetching filtered users:", error);
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFilterChange = (e, type) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setFilters((prevFilters) => {
      if (isChecked) {
        return { ...prevFilters, [type]: [...prevFilters[type], value] };
      } else {
        return {
          ...prevFilters,
          [type]: prevFilters[type].filter((item) => item !== value),
        };
      }
    });
  };

  return (
    <div className="text-white">
      <Navbar data={result} />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div>
            <h3 className="font-bold mb-2">Domain</h3>
            {domainOptions.map((option, index) => (
              <div key={index}>
                <label>
                  <input
                    type="checkbox"
                    value={option}
                    onChange={(e) => handleFilterChange(e, "domain")}
                  />{" "}
                  {option}
                </label>
              </div>
            ))}
          </div>
          <div>
            <h3 className="font-bold mb-2">Gender</h3>
            {genderOptions.map((option, index) => (
              <div key={index}>
                <label>
                  <input
                    type="checkbox"
                    value={option}
                    onChange={(e) => handleFilterChange(e, "gender")}
                  />{" "}
                  {option}
                </label>
              </div>
            ))}
          </div>
          <div>
            <h3 className="font-bold mb-2">Availability</h3>
            {availableOptions.map((option, index) => (
              <div key={index}>
                <label>
                  <input
                    type="checkbox"
                    value={option}
                    onChange={(e) => handleFilterChange(e, "available")}
                  />{" "}
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="grid md:mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((user, index) => (
            <UserCard key={index} user={user} />
          ))}
        </div>
        <div className="flex justify-between mt-4">
          {currentPage > 1 && (
            <button
              onClick={handlePreviousPage}
              className="bg-[#55c57a] hover:bg-[#1aaa4a] text-white font-bold py-2 px-4 rounded"
            >
              Load Less
            </button>
          )}
          {!loading && users.length > 0 && (
            <button
              onClick={handleNextPage}
              className="bg-[#55c57a] hover:bg-[#1aaa4a] text-white font-bold py-2 px-4 rounded"
            >
              Load More
            </button>
          )}
        </div>
        {loading && <p>Loading...</p>}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
