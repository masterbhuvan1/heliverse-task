import React from "react";
import { FaBusinessTime } from "react-icons/fa";
import { SiMarketo } from "react-icons/si";
import { GrMoney } from "react-icons/gr";
import { MdComputer } from "react-icons/md";
import { GiStack } from "react-icons/gi";
import { SiAltiumdesigner } from "react-icons/si";
import { MdFemale } from "react-icons/md";
import { IoMaleSharp } from "react-icons/io5";
import { FaGenderless } from "react-icons/fa";
import { TbGenderBigender } from "react-icons/tb";
import { IoMaleFemale } from "react-icons/io5";
import { TbGenderGenderfluid } from "react-icons/tb";
import { TbGenderGenderqueer } from "react-icons/tb";
import { PiGenderNonbinary } from "react-icons/pi";
import { MdOutlineMailOutline } from "react-icons/md";
import { FcSalesPerformance } from "react-icons/fc";
const domainIcons = {
  "Business Development": <FaBusinessTime size={24} />,
  Finance: <GrMoney size={24} />,
  IT: <MdComputer size={24} />,
  Management: <GiStack size={24} />,
  Marketing: <SiMarketo size={24} />,
  "UI Designing": <SiAltiumdesigner size={24} />,
  Sales: <FcSalesPerformance size={24} />,
};
const genderIcon = {
  Male: <IoMaleSharp size={24} />,
  Female: <MdFemale size={24} />,
  Agender: <FaGenderless size={24} />,
  Bigender: <TbGenderBigender size={24} />,
  Polygender: <IoMaleFemale size={24} />,
  Genderfluid: <TbGenderGenderfluid size={24} />,
  Genderqueer: <TbGenderGenderqueer size={24} />,
  "Non-binary": <PiGenderNonbinary size={24} />,
};
function EmailIcon() {
  return (
    <svg
      className="h-5 w-5 text-indigo-500 mr-2"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>{" "}
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  );
}
const UserCard = ({ user }) => {
  const { first_name, last_name, email, gender, avatar, domain, available } =
    user;
  const IconPath = domainIcons[domain] || (
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
  ); // Default icon if domain not found
  const GenderIcon = genderIcon[gender] || (
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
  ); // Default icon if domain not found

  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
      <div className="flex justify-center items-center h-40 bg-gradient-to-r from-green-800 via-green-500 to-green-300">
        <img
          src={avatar}
          alt={`${first_name} ${last_name}`}
          className="h-32 w-32 rounded-full border-4 border-white shadow-sm"
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-4 text-gray-800">{`${first_name} ${last_name}`}</div>
        <div className="space-y-2">
          <div className="flex items-center text-gray-700">
            <EmailIcon />
            <span>{email}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <svg
              className="h-5 w-5 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {IconPath}
            </svg>
            <span>{domain}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <svg
              className="h-5 w-5 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {GenderIcon}
            </svg>
            <span>{gender}</span>
          </div>
        </div>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span
          className={`inline-block ${
            available ? "bg-green-200" : "bg-red-200"
          } rounded-full px-3 py-1 text-sm font-semibold ${
            available ? "text-green-800" : "text-red-800"
          } mr-2 mb-2 transition ease-in-out duration-300`}
        >
          <svg
            className={`h-5 w-5 inline mr-2 ${
              available ? "text-green-500" : "text-red-500"
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {available ? (
              <path d="M5 13l4 4L19 7" />
            ) : (
              <path d="M6 18L18 6M6 6l12 12" />
            )}
          </svg>
          {available ? "Available" : "Not Available"}
        </span>
      </div>
    </div>
  );
};

export default UserCard;
