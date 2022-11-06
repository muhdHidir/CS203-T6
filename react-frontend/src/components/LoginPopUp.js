import React from "react";
import Popup from "reactjs-popup";
import "../index.css";
import { Button } from "@mantine/core";
import { motion } from "framer-motion";

import { variants } from "../assets/Animations";

import Login from "./Login";
import Login2 from "./Login";

const LoginPopUp = () => (
  <Popup
    trigger={
      <Button
        color="teal"
        radius="xl"
        className="border-2 border-white hover:border-0 hover:scale-110 mx-auto mt-0"
      >
        Login / Sign Up
      </Button>
    }
    modal
    nested
  >
    {(close) => (
      <div className="login-modal">
        {/* <button className="close" onClick={close}>
          &times;
        </button> */}
        <motion.div
          initial="hidden_ease"
          animate="visible_ease"
          exit="hidden_ease"
          variants={variants}
          className="col-md-12"
        >
          <Login2 onClick={close} />
        </motion.div>
      </div>
    )}
  </Popup>
);

export default LoginPopUp;
