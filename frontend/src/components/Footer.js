import Link from "next/link";
import Image from "next/image";
import React from "react";
const Footer = () => {
  return (
    <footer className="bg-gray-800 mt-3 text-white py-8 bottom-0 relative">
      <div className="container mx-auto px-4 flex flex-col items-center md:flex-row">
        <div className="flex items-center mb-4 md:mb-0">
          <Image
            src="/logo-green-small.png"
            alt="TeamConnect Logo"
            width={50}
            height={50}
          />
          <span className="text-xl font-bold ml-2">TeamConnect</span>
        </div>
        <div className="md:ml-auto">
          <ul className="flex flex-wrap justify-center items-center mb-4 md:mb-0">
            <li>
              <Link href="/">
                <div className="px-4 py-2 hover:underline">About us</div>
              </Link>
            </li>
            <li>
              <Link href="/">
                <div className="px-4 py-2 hover:underline">Download apps</div>
              </Link>
            </li>
            <li>
              <Link href="/">
                <div className="px-4 py-2 hover:underline">Careers</div>
              </Link>
            </li>
            <li>
              <Link href="/">
                <div className="px-4 py-2 hover:underline">Contact</div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-center md:text-left">
          <p>&copy; by Bhuvan Jain. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
