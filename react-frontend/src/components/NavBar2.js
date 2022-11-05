import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App2.css";
import "../css/barchart.css";
import "../css/navbar2.css";
// import "../css/navbar.css";
import LoginPopUp from "./LoginPopUp";

import { MusicUpIcon, MusicOffIcon } from "../icons";
import thegreeninvestor from "../assets/thegreeninvestor.png";
import myMusic from "../assets/music.mp3";
import MuteButton from "./MuteButton2";

import AuthService from "../services/auth.service";
// import AuthVerify from "./common/auth-verify";
import EventBus from "../common/EventBus";

// const languages = [
//   { value: "", text: "Change language" },
//   { value: "en", text: "English" },
//   { value: "zh", text: "中文(简体）" },
//   { value: "es", text: "español" },
//   // { value: 'ms', text: "Bahasa Melayu" },
// ];

export default function NavBar2() {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  // const [music, setMusic] = useState(new Audio(myMusic));
  const [playing, setPause] = useState(false);

  const player = new Audio(myMusic);

  const { t } = useTranslation();

  const [lang, setLang] = useState("");

  // This function put query that helps to
  // change the language
  const handleChange = (e) => {
    setLang(e.target.value);
    let loc = "http://localhost:8081/";
    window.location.replace(loc + "?lng=" + e.target.value);
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  // For music player, runs everytime 'playing' is changed
  useEffect(() => {
    playing ? player.play() : player.pause();

    // This is cleanup of the effect
    return () => player.pause();
  }, [playing]);

  function logOut() {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  }

  function _toggleMuteButton() {
    // var myAudio = document.getElementById("audio_player");
    // myAudio.muted = !myAudio.muted;
    setPause((s) => !s);
    // setPause(!playing);
  }
  const googleTranslateElementInit = () => {
    var duplicate_google_translate_counter = 0;
    if (duplicate_google_translate_counter === 0) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "ar,zh-TW,ms,es,en",
          autoDisplay: false,
        },

        "google_translate_element"
      );
    }
    duplicate_google_translate_counter++;
  };
  useEffect(() => {
    if (typeof Node === "function" && Node.prototype) {
      const originalRemoveChild = Node.prototype.removeChild;
      Node.prototype.removeChild = function (child) {
        if (child.parentNode !== this) {
          if (console) {
            console.error(
              "Cannot remove a child from a different parent",
              child,
              this
            );
          }
          return child;
        }
        return originalRemoveChild.apply(this, arguments);
      };

      const originalInsertBefore = Node.prototype.insertBefore;
      Node.prototype.insertBefore = function (newNode, referenceNode) {
        if (referenceNode && referenceNode.parentNode !== this) {
          if (console) {
            console.error(
              "Cannot insert before a reference node from a different parent",
              referenceNode,
              this
            );
          }
          return newNode;
        }
        return originalInsertBefore.apply(this, arguments);
      };
    }
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  return (
    // Fixed size that NavBar will take up
    <div className="nav-container lg:h-20 fixed w-full text-white text-m grid grid-cols-12 z-20 my-auto py-auto">
      <audio
        id="audio_player"
        autoPlay
        loop
        // controls
      >
        <source src={myMusic} type="audio/mp3" />
      </audio>

      {/* Home and Leaderboard, keep at leftmost except for mobile, which will be below title */}
      <div
        className="order-3 col-span-12 grid grid-cols-2
                  lg:-order-1 lg:col-span-4
                  text-md my-auto pt-2 lg:pt-0 pb-2 text-center"
      >
        <Link
          to={"/home"}
          className="col-span-2 lg:col-span-1 py-2 md:py-0 cursor-pointer hover:scale-110"
        >
          Home
        </Link>

        <Link
          to={"/leaderboard"}
          className="col-span-2 lg:col-span-1 py-2 md:py-0 cursor-pointer hover:scale-110"
        >
          {t("home-leaderboard")}
        </Link>

        {showModeratorBoard && (
          <Link to={"/mod"} className="cursor-pointer hover:scale-110">
            Moderator Board
          </Link>
        )}

        {showAdminBoard && (
          <Link to={"/admin"} className="cursor-pointer hover:scale-110">
            Admin Board
          </Link>
        )}
      </div>

      {/* Title, keep at Center, except mobile, which will be below lang/music */}
      <span
        className="navbar-title -order-1 col-span-12
                  lg:py-4 lg:col-span-4 lg:order-4 
                  my-auto text-center"
      >
        The Green Investor
      </span>

      {/* Lang & Music, keep at right, before login but at top for mobile */}
      {/* music button, ADD MUSIC LATER */}
      <div
        className="grid grid-cols-2 
                  -order-3 col-span-12
                  lg:order-6 lg:col-span-2 xl:col-span-2
                  my-auto pt-2 lg:pt-0 pb-2 text-center
      "
      >
        <div className="music-button hover:scale-110 m-auto cursor-pointer">
          <MuteButton playing={playing} _toggleMuteButton={_toggleMuteButton} />
        </div>
        <div className="" id="google_translate_element" />
      </div>

      {/* Login, keep at rightmost at all times */}
      {/* Log in, log out */}

      <div
        className="order-last col-span-12
                  lg:col-span-2 w-auto
                  my-auto text-center"
      >
        {/* when user is logged in */}
        {currentUser ? (
          <div className="grid grid-cols-2">
            <Link
              to={"/profile"}
              className="cursor-pointer hover:scale-110 m-auto "
            >
              {currentUser.username}
            </Link>
            <div className="cursor-pointer hover:scale-110 m-auto ">
              <a href="/home" onClick={logOut}>
                {t("home-logout")}
              </a>
            </div>
          </div>
        ) : (
          // when user is not logged in
          <LoginPopUp class="notranslate" />
        )}
      </div>
    </div>
  );
}
