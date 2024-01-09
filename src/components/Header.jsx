import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex p-5 justify-between items-center absolute w-full mt-3 z-10">
      <h2 className="font-black text-white text-xl">THEATERIN</h2>
      <nav className="">
        <ul className="flex gap-5 cursor-pointer list-header text-sm text-white font-semibold">
            <li>
              <Link to={"/booking"}>
                <FaCartShopping size={22} color="#FFFF"/>
              </Link>
            </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
