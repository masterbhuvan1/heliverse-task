import React, { useState, useEffect } from "react";
import TeamCard from "../../components/teamCard";
import axios from "axios";
import { Backend_URL } from "../../utils/constants";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
const loader = async () => {
  let img = "default.jpg";
  console.log("called");
  let name = "";
  let id = "";
  // console.info("cookie", cookieData, document.cookie.jwt);
  const configuration = {
    method: "post",
    url: `${Backend_URL}/api/v1/users/isLoggedIn`,
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
const TeamsDisplay = () => {
  const [teams, setTeams] = useState([]);
  const [result, setResult] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      let result = await loader();
      setResult(result);
      if (!result.hasCookie) {
        router.push("/login");
      }
      // Assuming you want to do something with the result
      console.log(result);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`${Backend_URL}/api/teams`);
        setTeams(response.data.data.data); // Adjust according to your API response
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  return (
    <>
      <Navbar data={result} />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
          {teams &&
            teams.map((team, index) => <TeamCard key={index} team={team} />)}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TeamsDisplay;
