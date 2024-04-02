import React, { useState, useEffect } from "react";
import axios from "axios";
import { Backend_URL } from "../utils/constants";
const TeamCard = ({ team }) => {
  const [memberDetails, setMemberDetails] = useState([]);
  const [creatorDetails, setCreatorDetails] = useState({});

  useEffect(() => {
    // Function to fetch user details
    const fetchUserDetails = async (userId) => {
      try {
        const response = await axios.get(`${Backend_URL}/api/users/${userId}`);
        return response.data; // Adjust this based on your API response structure
      } catch (error) {
        console.error(`Failed to fetch user details for ID ${userId}:`, error);
        return null;
      }
    };

    // Fetch details for all members
    const fetchMembersDetails = async () => {
      const details = await Promise.all(
        team.members.map((userId) => fetchUserDetails(userId))
      );
      setMemberDetails(details.filter((detail) => detail !== null)); // Exclude any failed fetches
    };

    // Fetch details for the creator
    const fetchCreatorDetails = async () => {
      const details = await fetchUserDetails(team.created_by);
      setCreatorDetails(details);
    };

    fetchMembersDetails();
    fetchCreatorDetails();
  }, [team.members, team.created_by]);
  console.log(memberDetails);
  console.log(creatorDetails);

  return (
    memberDetails &&
    creatorDetails && (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-5">
        <div className="flex justify-center items-center h-40 bg-gradient-to-r from-green-800 via-green-500 to-green-300">
          {/* Assuming the first member's avatar to represent the team, adjust as needed */}
          <img
            src={
              creatorDetails?.data?.data?.avatar ||
              "path/to/default/team/image.jpg"
            }
            alt="Team Image"
            className="h-32 w-32 rounded-full border-4 border-white shadow-sm"
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Team: {team.team_name}
          </div>
          <p className="block mt-1 text-lg leading-tight font-medium text-black">
            Description: {team.description}
          </p>
          {
            <p className="mt-2 text-gray-500">
              Created by: {creatorDetails?.data?.data?.first_name}{" "}
              {creatorDetails?.data?.data?.last_name}-{" "}
              {creatorDetails?.data?.data?.domain}{" "}
            </p>
          }
          <div className="mt-4">
            <div className="font-semibold text-black">Members:</div>
            {memberDetails.map((member, index) => (
              <p key={index} className="text-gray-600">
                {member.data.data.first_name} {member.data.data.last_name} -{" "}
                {member.data.data.domain}{" "}
                {/* Adjust according to your data structure */}
              </p>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default TeamCard;
