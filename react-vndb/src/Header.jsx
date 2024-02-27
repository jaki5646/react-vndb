import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Home from "./components/Home";
import { IoIosArrowDown } from "react-icons/io";
import { FaFacebookF } from "react-icons/fa";
import { IoMoonOutline } from "react-icons/io5";
import { HiMagnifyingGlass } from "react-icons/hi2";
import "./Header.css";

const Header = () => {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    setSearch(input);
  };


  return (
    <div className="header">
      {/* Top header */}

      <div className="header-top">
        <div className="header-top-left">
          <ul>
            <li>
              <NavLink className="left-logo" to={"/"}>
                HOME
              </NavLink>
            </li>
            <li>
              <a href="https://discord.gg/hoshivn" className="header-discord">
                LIÊN HỆ DISCORD
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/HoshiFansub"
                className="header-facebook"
              >
                LIÊN HỆ FACEBOOK
              </a>
            </li>
          </ul>
        </div>
        <div className="header-top-right">
          <a href="https://www.facebook.com/hoshifansub/">
            <FaFacebookF className="header-icon" />
          </a>
        </div>
      </div>

      {/* Bottom header */}

      <div className="header-bottom">
        <div className="header-bottom-left">
          <div className="header-bottom-logo">
            <Link to={"/"}>
              <img src="../src/assets/logo.png" alt="" />
            </Link>
          </div>

          {/* real nav */}

          <div className="header-bottom-dropdown">
            <button className="dropbtn">
              Thể loại <IoIosArrowDown className="nav-arrow" />
            </button>
            <div className="dropdown-content">
              <Link className={`nav-dropdown`}>Visual Novels</Link>
            </div>
          </div>

          <div className="header-bottom-dropdown">
            <button className="dropbtn">
              Hệ máy <IoIosArrowDown className="nav-arrow" />
            </button>
            <div className="dropdown-content">
              <Link className={`nav-dropdown`}>PC</Link>
              <Link className={`nav-dropdown`}>Android</Link>
              <Link className={`nav-dropdown`}>Other</Link>
            </div>
          </div>

          <Link to={"/rating"} className="header-bottom-redirect">
            Bảng xếp hạng
          </Link>
        </div>
        <div className="header-bottom-input">
          <form action="">
            <input
              type="text"
              value={input}
              onChange={(i) => {
                setInput(i.target.value);
              }}
              placeholder="Tìm kiếm Visual Novel"
            />
            <button onClick={handleClick} className="header-bottom-search-btn">
              <HiMagnifyingGlass />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Header;
