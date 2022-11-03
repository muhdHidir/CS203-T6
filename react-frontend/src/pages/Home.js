import React, { useEffect, useState } from "react";
import { Link, Route, Router, useNavigate } from "react-router-dom";
import { Parallax } from "react-scroll-parallax";
import { Box, Button, Stack } from "@mantine/core";
import { Tabs } from "@mantine/core";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import backgroundVideo from "../assets/forestbg.mp4";
import { ParallaxProvider } from "react-scroll-parallax";

import { variants } from "../assets/Animations";

import UserService from "../services/user.service";
import { displayContent } from "../assets/LandingPageDisplayContent";
import { PrevIcon } from "../icons";

import authService from "../services/auth.service";
import ImportanceSustain from "../components/SustainabilityImportance/ImportanceSustain";

import "../css/home.css";
import {
  Tree1,
  ScrollTip,
  Leaf1,
  //  WaveUp, WaveDown
} from "../assets/images";

export default function Home() {
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

  // const tabValues = ["first", "second", "third", "forth"];

  // function handleNextClick() {
  //   let oldIndex = tabValues.indexOf(activeTab);
  //   setActiveTab(tabValues[++oldIndex]);
  // }
  // function handlePrvClick() {
  //   let oldIndex = tabValues.indexOf(activeTab);
  //   setActiveTab(tabValues[--oldIndex]);
  // }

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
    <div className="container">
      <div className="">
        <Parallax
          speed={40}
          className="screen1 flex flex-col justify-between items-center"
        >
          <span />
          <h1 className="center bounce title mt-10 self-center shadow-xl border-t-4 border-b-4 text-center">
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

        <div className="screen2 h-screen ">
          {/* <Parallax speed={-30}>
            <img
              src={Leaf1}
              id="leftLeaf"
              className="treeright fixed w-60 top-0"
              alt=""
            />
          </Parallax> */}
          <div className="text-container grid grid-cols-3 text-center curve ">
            <Parallax
              translateX={[-20, 10]}
              className="subheader justify-start"
            >
              {subheaders[0]}
            </Parallax>
            <span className="flex-1" />
            <Parallax translateX={[20, -10]} className="text-content">
              {displayContent[0].src}
            </Parallax>
          </div>
        </div>
        <div className="screen3 h-screen">
          <div className="text-container grid grid-cols-3 text-center">
            <Parallax
              speed={20}
              translateX={[-30, 10]}
              className="text-content"
            >
              {displayContent[1].src}
            </Parallax>
            <span className="flex-1" />
            <Parallax
              // speed={20}
              translateX={[20, -20]}
              className="subheader"
            >
              {subheaders[1]}
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
          <div className="text-container grid grid-cols-3 text-center">
            <Parallax
              // speed={20}
              translateX={[-20, 30]}
              className="subheader m-auto"
            >
              {subheaders[2]}
            </Parallax>
            <Parallax
              speed={20}
              translateX={[20, -30]}
              className="text-content m-auto"
            >
              {displayContent[2].src}
            </Parallax>
          </div>
        </div>
        <div className="screen5 h-screen">
          <Parallax
            translateY={[-20, 30]}
            className="h-screen items-center grid grid-rows-3 text-center"
          >
            <div className="subheader m-auto">{subheaders[3]}</div>
            <div className="text-content m-auto">{displayContent[3].src}</div>
            <div className="play-button m-auto p-2 text-3xl cursor-pointer border-white border-2 border-opacity-50 rounded-3xl hover:scale-110">
              Play
            </div>
          </Parallax>
        </div>
      </div>
    </div>
  );
}
