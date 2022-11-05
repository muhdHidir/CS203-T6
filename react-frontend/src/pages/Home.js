import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Parallax } from "react-scroll-parallax";
import { useTranslation } from "react-i18next";

import UserService from "../services/user.service";
import { displayContent } from "../assets/LandingPageDisplayContent";

import authService from "../services/auth.service";

import "../css/home.css";
import { ScrollTip } from "../assets/images";

// export default function Home() {
export default function Home2() {
  const [content, setContent] = useState("");

  const [activeTab, setActiveTab] = useState("first");

  const [currentUser, setCurrentUser] = useState(undefined);

  const { t } = useTranslation();

  const subheaders = [
    "Introduction",
    "What is Sustainability?",
    "Importance of Sustainability",
    "How to Play?",
  ];

  let navigate = useNavigate();

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }

    const getPublicContent = async () => {
      try {
        const res = await UserService.getPublicContent();
        setContent(res.data);
      } catch (error) {
        setContent(
          (error.response && error.response.data) ||
            error.message ||
            error.toString()
        );
      }
    };
    getPublicContent();
  }, []);

  function makeid(length) {
    var result = "";
    var characters = "0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async function signUpAsGuest() {
    var username = "Guest" + makeid(5);
    var email = username + "@thegreeninvestor.com";
    var password = "123456";
    authService.register(username, email, password, "GUEST").then();
    await new Promise((r) => setTimeout(r, 1000));
    authService.login(username, password).then(() => {
      navigate("/game");
      window.location.reload();
    });
  }

  return (
    <div className="container text-center">
      <div className="container-content">
        <Parallax className="screen1 flex flex-col justify-between items-center">
          <span />
          <h1 className="center bounce title mt-10 self-center shadow-xl border-t-4 border-b-4 ">
            Welcome to the Sustainability Game
          </h1>

          <div className="scrollTip flex-end mb-10">
            <img
              src={ScrollTip}
              className="scrollTip w-10 px-1 border-x-2"
              alt="Scroll"
            />
          </div>
        </Parallax>
        {/* <Parallax speed={-20}>
            <img
              src={Leaf1}
              className="treeright right-0 fixed w-60 top-0"
              alt=""
            />
          </Parallax> */}

        <div className="screen2 h-screen">
          {/* <Parallax speed={-30}>
            <img
              src={Leaf1}
              id="leftLeaf"
              className="treeright fixed w-60 top-0"
              alt=""
            />
          </Parallax> */}
          <div className="text-container grid grid-rows-3 h-full">
            <Parallax
              // translateX={[-20, 10]}
              className="subheader m-auto p-3 m-3"
            >
              {subheaders[0]}
            </Parallax>
            <Parallax
              // translateX={[20, -10]}
              className="text-content p-3 my-auto mt-5 row-span-2"
            >
              {displayContent[0].src}
            </Parallax>
          </div>
        </div>
        <div className="screen3 h-screen">
          <div className="text-container grid grid-rows-3 md:grid-cols-3 h-full">
            <Parallax className="subheader m-auto p-3">
              {subheaders[1]}
            </Parallax>
            <Parallax className="text-content p-3 my-auto md:ml-5 row-span-2 md:col-span-2">
              {displayContent[1].src}
            </Parallax>
          </div>

          {/* <Parallax speed={-20} translateX={[0, -100]}>
            <img src={Tree1} className="tree fixed left-0" alt="" />
            <img
              src={Tree1}
              id="rightTree"
              className="tree fixed right-0"
              alt=""
            />
          </Parallax> */}
        </div>
        <div className="screen4 h-screen">
          <div className="text-container grid grid-rows-3 md:grid-cols-3 h-full">
            <Parallax
              // speed={20}
              // translateX={[-20, 30]}
              className="subheader p-3 m-auto "
            >
              {subheaders[2]}
            </Parallax>
            <Parallax
              // speed={20}
              // translateX={[20, -30]}
              className="text-content md:order-first p-3 my-auto md:mr-5 row-span-2 md:col-span-2"
            >
              {displayContent[2].src}
            </Parallax>
          </div>
        </div>
        <div className="screen5 h-screen">
          <Parallax
            // translateY={[-20, 30]}
            className="h-screen items-center grid grid-rows-3 "
          >
            <div className="subheader m-auto p-3">{subheaders[3]}</div>
            <div className="text-content m-auto p-3">
              {displayContent[3].src}
            </div>
            <div className="play-button m-auto p-3 p-2 text-3xl cursor-pointer hover:bg-darkGreen-50 hover:border-0 border-white border-2 border-opacity-50 rounded-3xl hover:scale-110">
              <Link to="/game">
                Play as Guest
                {/* {t("home-button-playgame")} */}
              </Link>
            </div>
            {/* {currentUser ? (
              <Link to="/game" className="">
                <Button className="play-button m-auto p-3 p-2 text-3xl cursor-pointer hover:bg-darkGreen-50 hover:border-0 border-white border-2 border-opacity-50 rounded-3xl hover:scale-110">
                  {"home-button-playgame"}
                </Button>
              </Link>
            ) : (
              <Button className="play-button m-auto p-3 p-2 text-3xl cursor-pointer hover:bg-darkGreen-50 hover:border-0 border-white border-2 border-opacity-50 rounded-3xl hover:scale-110">
                {"home-button-playguest"}
              </Button>
            )} */}
          </Parallax>
        </div>
      </div>
    </div>
  );
}
