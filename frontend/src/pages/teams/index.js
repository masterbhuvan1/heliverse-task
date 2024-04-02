import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router"; // Ensure you're using Next.js router if you're in a Next.js project
import Navbar from "../../components/NavBar";

import TeamCard from "../../components/teamCard";
import { Backend_URL } from "../../utils/constants";

const loader = async () => {
  const configuration = {
    method: "post",
    url: `${Backend_URL}/api/v1/users/isLoggedIn`,
    credentials: true,
    withCredentials: true,
  };

  try {
    const response = await axios(configuration);
    return {
      hasCookie: true,
      img: response.data.user.avatar || "default.jpg",
      name: response.data.user.first_name,
      id: response.data.user._id,
    };
  } catch (error) {
    return { hasCookie: false, img: "", name: "", id: "" };
  }
};

const TeamsDisplay = () => {
  const router = useRouter();
  const [teams, setTeams] = useState([]);
  const [result, setResult] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await loader();
      setResult(result);
      if (!result.hasCookie) {
        router.push("/login");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    fetchTeams();
  }, [currentPage]);

  const fetchTeams = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${Backend_URL}/api/teams`, {
        params: { page: currentPage, limit: 9 }, // Adjust limit as per your requirement
      });
      setTeams(response.data.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching teams:", error);
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleLoadLess = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
  };

  return (
    <>
      <Navbar data={result} />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((team, index) => (
            <TeamCard key={index} team={team} />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          {currentPage > 1 && (
            <button
              onClick={handleLoadLess}
              className="bg-[#55c57a] text-white py-2 px-4 mr-2 rounded hover:bg-[#1aaa4a]"
            >
              Load Less
            </button>
          )}
          <button
            onClick={handleLoadMore}
            className="bg-[#55c57a] text-white py-2 px-4 rounded hover:bg-[#1aaa4a]"
          >
            Load More
          </button>
        </div>
        {isLoading && <p>Loading...</p>}
      </div>
    </>
  );
};

export default TeamsDisplay;
