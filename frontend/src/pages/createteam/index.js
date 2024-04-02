import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { Backend_URL } from "../../utils/constants";

const domainOptions = [
  "Business Development",
  "Finance",
  "IT",
  "Management",
  "Marketing",
  "UI Designing",
];
const initialDomainOptions = [
  "Business Development",
  "Finance",
  "IT",
  "Management",
  "Marketing",
  "UI Designing",
];
const loader = async () => {
  let img = "default.jpg";
  console.log("called");
  let name = "";
  let id = "";

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

const CreateTeam = () => {
  const router = useRouter();
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [domainOptions, setDomainOptions] = useState([...initialDomainOptions]);
  const [selectedDomain, setSelectedDomain] = useState(initialDomainOptions[0]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastFetchedDomain, setLastFetchedDomain] = useState(selectedDomain);
  useEffect(() => {
    const isNewDomain = selectedDomain !== lastFetchedDomain;

    fetchUsers(selectedDomain, currentPage)
      .then((fetchedUsers) => {
        if (isNewDomain || currentPage === 1) {
          setUsers(fetchedUsers);
        } else {
          setUsers((prevUsers) => [...prevUsers, ...fetchedUsers]);
        }
        setLastFetchedDomain(selectedDomain);
      })
      .catch(console.error);
  }, [selectedDomain, currentPage]);
  const [result, setResult] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      let result = await loader();
      setResult(result);
      if (!result.hasCookie) {
        router.push("/login");
      }

      console.log(result);
    };

    fetchData();
  }, []);

  const handleAddUser = (user) => {
    if (
      window.confirm(`Add ${user.first_name} ${user.last_name} to the team?`)
    ) {
      setSelectedUsers((prevUsers) => [...prevUsers, user]);
      const newDomainOptions = domainOptions.filter(
        (domain) => domain !== user.domain
      );
      setCurrentPage(1);
      setDomainOptions(newDomainOptions);

      if (newDomainOptions.length > 0) {
        setSelectedDomain(newDomainOptions[0]);
      } else {
        setSelectedDomain("");
        setUsers([]);
      }
    }
  };
  console.log(users);

  const handleRemoveUser = (index) => {
    const userToRemove = selectedUsers[index];
    if (
      window.confirm(
        `Remove ${userToRemove.first_name} ${userToRemove.last_name} from the team?`
      )
    ) {
      const newSelectedUsers = selectedUsers.filter((_, i) => i !== index);
      setSelectedUsers(newSelectedUsers);

      if (
        !newSelectedUsers.some((user) => user.domain === userToRemove.domain)
      ) {
        setDomainOptions((prevDomains) =>
          [...prevDomains, userToRemove.domain].sort()
        );
        setSelectedDomain(userToRemove.domain);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const created_by = result.id;

    try {
      const response = await axios.post(`${Backend_URL}/api/team/createTeam`, {
        team_name: teamName,
        description: description,
        members: selectedUsers,
        created_by: created_by,
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error creating team:", error.response.data);
    }
  };

  const handleFetchMoreUsers = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  return (
    <>
      <Navbar data={result} />
      <div className="max-w-xl mt-6 mb-6 mx-auto p-5 text-black bg-gray-100 rounded-lg shadow">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-lg font-semibold text-center text-gray-700">
            Create a Team
          </h2>
          <input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <select
            value={selectedDomain}
            onChange={(e) => {
              setSelectedDomain(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={domainOptions.length === 0}
          >
            {domainOptions.map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
          </select>
          <div className="max-h-40 overflow-y-auto">
            {users.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between p-2 hover:bg-gray-200 rounded cursor-pointer"
                onClick={() => handleAddUser(user)}
              >
                <img
                  src={user.avatar}
                  alt="Avatar"
                  style={{ width: 50, height: 50 }}
                  className="rounded-full"
                />
                <span>
                  {user.first_name} {user.last_name}
                </span>
                <span className="text-sm text-gray-600">{user.domain}</span>
              </div>
            ))}
          </div>
          <div>
            {!selectedUsers.length == 0 && (
              <h3 className="text-lg font-semibold">Selected Users</h3>
            )}
            {selectedUsers.map((user, index) => (
              <div
                key={index}
                onClick={() => handleRemoveUser(index)}
                className="flex items-center justify-between p-2 bg-gray-200 rounded mt-2 cursor-pointer"
              >
                <span>
                  {user.first_name} {user.last_name} ({user.domain})
                </span>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleFetchMoreUsers}
            className="w-full p-2 bg-[#55c57a] text-white rounded hover:bg-[#1aaa4a]"
          >
            Load More Users
          </button>
          <button
            onClick={handleSubmit}
            className="w-full p-2 bg-[#55c57a] text-white rounded hover:bg-[#1aaa4a] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Team
          </button>
        </form>
      </div>
    </>
  );
};

async function fetchUsers(domain, page = 1) {
  try {
    const response = await axios.get(
      `${Backend_URL}/api/users/?domain=${domain}&available=true&page=${page}&teamId=null`
    );
    return response.data.data.data;
  } catch (error) {
    console.error("Failed to fetch users", error);
    return [];
  }
}

export default CreateTeam;
