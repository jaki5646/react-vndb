import React, { useContext, useRef, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import Home from "./components/Home";
import { IoIosArrowDown } from "react-icons/io";
import { FaFacebookF } from "react-icons/fa";
import { IoMoonOutline } from "react-icons/io5";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { AppProvider } from "./App";
import "./Header.css";
import useWindowDimensions from "./components/useWindowDimensions";

const Header = () => {
  const { height, width } = useWindowDimensions();
  const isLogin = localStorage.getItem("logged-user") !== null;
  const navigate = useNavigate();

  const [input, setInput] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/search?key=${input}`);
  };
  const handleLogout = () => {
    localStorage.removeItem("logged-user");
    window.location.reload(true);
  };
  let hbdResponsive = "flex";
  if (width <= 992) {
    hbdResponsive = "none";
  }

  return (
    <div className="header">
      {/* Top header */}

      <div className="header-top" style={{padding: width <= 762 && "0 30px"}}>
        <div className="header-top-left">
          <ul>
            <li>
              <Link className="left-logo" to={"/"}>
                HOME
              </Link>
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

      <div className="header-bottom" style={{padding: width <= 762 && "0 30px"}}>
        <div className="header-bottom-left">
          <div className="header-bottom-logo">
            <Link to={"/"}>
              <img src="/img/logo.png" alt="" />
            </Link>
          </div>

          {/* real nav */}

          <div className="header-bottom-nav-left" style={{display: hbdResponsive}}>
            <div className={`header-bottom-dropdown`}>
              <button className="dropbtn">
                Thể loại <IoIosArrowDown className="nav-arrow" />
              </button>
              <div className="dropdown-content">
                <Link className={`nav-dropdown`}>Romance</Link>
                <Link className={`nav-dropdown`}>Fantasy</Link>
                <Link className={`nav-dropdown`}>Action</Link>
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
        </div>
        <div className="header-bottom-right">
          {/* search input */}
          <div className="header-bottom-input">
            <form action="">
              <input
              style={{minWidth: width <= 762 && "230px"}}
                type="text"
                value={input}
                onChange={(i) => {
                  setInput(i.target.value);
                }}
                placeholder="Tìm kiếm Visual Novel"
              />
              <button
                onClick={handleClick}
                className="header-bottom-search-btn"
              >
                <HiMagnifyingGlass />
              </button>
            </form>
          </div>

          {/* login */}
          <div className="header-bottom-login" style={{display: width <= 762 && "none"}}>
            {!isLogin ? (
              <>
                <Link to={"/sign-in"} className="header-bottom-redirect">
                  Signin
                </Link>
              </>
            ) : (
              <div className="header-bottom-dropdown">
                <button className="dropbtn avatar-drop">
                  <img src="/img/reimu.ico" alt="s" className="avatar" />
                </button>
                <div className="dropdown-content">
                  <div className="nav-dropdown nav-dropdown-username">
                    {JSON.parse(localStorage.getItem("logged-user")).username}
                  </div>
                  <Link className={`nav-dropdown`}>Cart</Link>
                  <button
                    className={`nav-dropdown nav-dropdown-btn`}
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
