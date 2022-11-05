import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { variants } from "../assets/Animations";

import DataMetric from "../components/DataMetric/DataMetric";
import { CashIcon, MoraleIcon, SustainabilityIcon } from "../icons";
import { Box, Grid, Text, Button, LoadingOverlay } from "@mantine/core";
import { Input } from "@mantine/core";
import "../css/game.css";

import authHeader from "../services/auth-header";

import axios from "axios";
import ReviewModal from "../components/PostQuestionReview/ReviewModal";

export default function Game() {
  const [data, setData] = useState([]);
  const [question, setQuestion] = useState();
  const [options, setOptions] = useState();
  const [isOpenEnded, setIsOpenEnded] = useState(false);
  //input values for open-ended questions
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue3, setInputValue3] = useState("");

  //used for the highlighting of the selected option
  const [selectedOption, setSelectedOption] = useState(null);

  //hardcoded Image changes on the fronend
  const imageArray = [1, 2, 3, 4, 5];
  const [imageIndex, setImageIndex] = useState(0);

  //index to iterate through the set of 10 questions
  const [index, setIndex] = useState(1);

  //Statistics Data State to update Graphs
  const [moraleChartData, setMoraleChartData] = useState([100]);
  const [sustainabilityChartData, setSustainabilityChartData] = useState([100]);
  const [cashChartData, setCashChartData] = useState([0, 100]);

  //for Review modal
  const [opened, setOpened] = useState(false);

  //handle closing of the reviewModal
  function closeHandler() {
    setOpened(false);
    setIndex(index + 1);
    setQuestion(data[index]);
    setImageIndex(imageIndex + 1);
    setSelectedOption(null);
  }

  //function called when the submit button is clicked (to transition the question and options and charts)
  async function onClickHandler() {
    // setIndex(index + 1);
    // setQuestion(data[index]);
    // setImageIndex(imageIndex + 1);
    // setSelectedOption(null);
    setMoraleChartData([moraleChartData[0] - 10]);
    setSustainabilityChartData([sustainabilityChartData[0] - 5]);
    setCashChartData((prevState) => [
      ...prevState,
      cashChartData[cashChartData.length - 1] - 10,
    ]);

    //submit Answer to backend
    submitAnswer();

    setOpened(true);
  }

  //function to submit Answer to backend
  async function submitAnswer() {
    if (isOpenEnded) {
      const response = await axios
        .post(
          `http://localhost:8080/api/${question.id}/answer`,
          {
            //concatenate input1, input2 and input3 by comma
            answer: inputValue1 + "," + inputValue2 + "," + inputValue3,
            isOpenEnded: true,
          },
          {
            headers: authHeader(),
            "Content-Type": "application/json",
          }
        )
        .then((response) => {
          console.log(response);
        });

      //reset the input values
      setInputValue1("");
      setInputValue2("");
      setInputValue3("");
    }
  }

  //to retrieve data from the backend regarding questions,first option
  useEffect(() => {
    async function getAllData() {
      await axios
        .get("http://localhost:8080/api/questions", {
          headers: authHeader(),
          "Content-Type": "application/json",
        })
        .then(async (response) => {
          await setData(response.data);
          await setQuestion(response.data[0]);
          await setIsOpenEnded(response.data[0].openEnded);
          return axios.get(`http://localhost:8080/api/questions/1/options`, {
            headers: authHeader(),
            "Content-Type": "application/json",
          });
        })
        .then((response) => {
          setOptions(response.data);
        })
        .catch((error) => console.log(error.response));
    }
    getAllData();
  }, []);

  //function to get subsequent options using the id
  useEffect(() => {
    async function getOptions() {
      if (question !== undefined) {
        const res = await axios
          .get(`http://localhost:8080/api/questions/${question.id}/options`, {
            headers: authHeader(),
            "Content-Type": "application/json",
          })
          .catch((error) => console.log(error.response));
        setOptions(res.data);
        setIsOpenEnded(question.openEnded);
      }
    }
    getOptions();
  }, [question]);

  // prevent running into an not found error causing the app to crash
  if (
    data === undefined ||
    question === undefined ||
    options === undefined ||
    imageArray[imageIndex] === undefined
  ) {
    return (
      <Box className="bg-gray-50 bg-opacity-70 h-[85vh] rounded-xl align-middle relative w-full pt-2 pr-2 pl-2 pb-2">
        <LoadingOverlay
          loaderProps={{ size: "xl", color: "black" }}
          overlayOpacity={0.0}
          overlayColor="#c5c5c5"
          visible
        />
      </Box>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants}
      className="main-container"
    >
      <ReviewModal opened={opened} handleClose={closeHandler} />
      <Box className="game-container grid grid-cols-12 bg-gray-50 bg-opacity-70 rounded-lg align-middle p-2 m-2 text-center">
        {/* Question and options */}
        <div className="quiz-container col-span-12 md:col-span-7 grid grid-rows-2 md:mr-5">
          <div className="question-container grid grid-rows-6">
            <div className="question-number font-semibold">
              {question.question}
            </div>
            <div className="question-image row-span-5 mt-2 ">
              <img
                className="rounded-2xl drop-shadow-xl mx-auto"
                src={require(`../assets/img${imageArray[imageIndex]}.jpg`)}
                alt="new"
              />
            </div>
          </div>
          {!isOpenEnded ? (
            <div className="options-container items-center mt-5 space-y-2">
              <Button
                onClick={() => setSelectedOption(0)}
                size="md"
                className={
                  selectedOption === 0
                    ? "w-[100%]  opacity-80 bg-darkGreen-50 text-white"
                    : " w-[100%]  opacity-80 bg-gray-50 text-black"
                }
                styles={(theme) => ({
                  root: {
                    "&:hover": {
                      backgroundColor: theme.fn.darken("#245A44", 0.05),
                    },
                  },
                })}
              >
                {options[0].option}
              </Button>
              <Button
                onClick={() => setSelectedOption(1)}
                size="md"
                className={
                  selectedOption === 1
                    ? "w-[100%]  opacity-80 bg-darkGreen-50 text-white"
                    : " w-[100%]  opacity-80 bg-gray-50 text-black"
                }
                styles={(theme) => ({
                  root: {
                    "&:hover": {
                      backgroundColor: theme.fn.darken("#245A44", 0.05),
                    },
                  },
                })}
              >
                {options[1].option}
              </Button>
              <Button
                onClick={() => setSelectedOption(2)}
                size="md"
                className={
                  selectedOption === 2
                    ? "w-[100%]  opacity-80 bg-darkGreen-50 text-white"
                    : " w-[100%]  opacity-80 bg-gray-50 text-black"
                }
                styles={(theme) => ({
                  root: {
                    "&:hover": {
                      backgroundColor: theme.fn.darken("#245A44", 0.05),
                    },
                  },
                })}
              >
                {options[2].option}
              </Button>
              <Button
                onClick={() => setSelectedOption(3)}
                size="md"
                className={
                  selectedOption === 3
                    ? "w-[100%]  opacity-80 bg-darkGreen-50 text-white"
                    : " w-[100%]  opacity-80 bg-gray-50 text-black"
                }
                styles={(theme) => ({
                  root: {
                    "&:hover": {
                      backgroundColor: theme.fn.darken("#245A44", 0.05),
                    },
                  },
                })}
              >
                {options[3].option}
              </Button>

              <Button
                onClick={onClickHandler}
                disabled={selectedOption === null ? true : false}
                size="md"
                className="submit-button w-[45%] bg-darkGreen-50 text-white mt-5"
              >
                Submit
              </Button>
            </div>
          ) : (
            <div className="options-container flex-col items-center mt-5 space-y-2">
              <Text className="font-semibold text-lg ">Enter your answers</Text>
              <Input
                className="w-[100%] bg-gray-50 text-black"
                placeholder="Enter your answer here"
                value={inputValue1}
                onChange={(e) => setInputValue1(e.target.value)}
              />
              <Input
                className="w-[100%] bg-gray-50 text-black"
                placeholder="Enter your answer here"
                value={inputValue2}
                onChange={(e) => setInputValue2(e.target.value)}
              />
              <Input
                className="w-[100%] bg-gray-50 text-black"
                placeholder="Enter your answer here"
                value={inputValue3}
                onChange={(e) => setInputValue3(e.target.value)}
              />
              <Button
                onClick={onClickHandler}
                disabled={
                  inputValue1 === "" || inputValue2 === "" || inputValue3 === ""
                    ? true
                    : false
                }
                size="md"
                className="submit-button w-[45%] bg-darkGreen-50 text-white mt-5"
              >
                Submit
              </Button>
            </div>
          )}
        </div>
        {/* Graphs */}
        <div className="graph-container col-span-12 md:col-span-5 grid grid-row-2 space-y-4">
          <Box className="graph-cash-container ">
            <DataMetric
              className="h-[53%] w-full "
              hasChart={true}
              icon={<CashIcon color="grey" className="text-xl" />}
              increment={5}
              value={cashChartData[cashChartData.length - 1]}
              unit={"SGD"}
              label="Cash"
              chartData={cashChartData}
            />
          </Box>

          <Box className="graph-etc-container flex flex-row ">
            <Box className="w-1/2 pr-1">
              <DataMetric
                increment={-5}
                icon={<MoraleIcon color="grey" className="text-xl" />}
                value={moraleChartData[0]}
                unit={"%"}
                label="Morale"
                chartData={moraleChartData}
              />
            </Box>
            <Box className="w-1/2 pl-1">
              <DataMetric
                icon={<SustainabilityIcon color="grey" className="text-xl" />}
                increment={7}
                value={sustainabilityChartData[0]}
                unit={"%"}
                label="Sustainability"
                chartData={sustainabilityChartData}
              />
            </Box>
          </Box>
        </div>
      </Box>
    </motion.div>
  );
}
