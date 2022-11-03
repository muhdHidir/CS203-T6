import React from "react";
import { Routes, Route } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import Register from "./pages/Register";
// import Home from "./pages/Home";
import Home2 from "./pages/Home2";
import Profile from "./pages/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
// import NavBar from "./components/NavBar";
import NavBar2 from "./components/NavBar2";
import Game from "./pages/Game";
import GameOver from "./pages/GameOver";
import GameWin from "./pages/GameWin";
import Leaderboard from "./pages/Leaderboard";
import Login from "./components/Login";

// import backgroundVideo from "./assets/forestbg.mp4";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

function App2() {
  return (
    <div className="main overflow-hidden">
      <video
        src="https://tgi-bucket.s3.ap-southeast-1.amazonaws.com/bg_vid.mp4"
        type="video/mp4"
        autoPlay
        loop
        muted
        className="fixed bg-video"
      />
      {/* <NavBar className="my-nav" /> */}
      <NavBar2 className="my-nav" />
      <div className="content">
        <div className="">
          <ParallaxProvider>
            <Routes>
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/" element={<Home2 />} />
              {/* <Route path="/home" element={<Home />} /> */}
              <Route path="/home" element={<Home2 />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/user" element={<BoardUser />} />
              <Route path="/mod" element={<BoardModerator />} />
              <Route path="/admin" element={<BoardAdmin />} />
              <Route path="/game" element={<Game />} />
              <Route path="/gameover" element={<GameOver />} />
              <Route path="/gamewin" element={<GameWin />} />
            </Routes>
          </ParallaxProvider>
        </div>
        <div className=" flex justify-center items-center">
          <Routes>
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </div>
        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    </div>
  );
}

export default App2;