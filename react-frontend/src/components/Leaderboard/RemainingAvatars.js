import { Group, Text, Box } from "@mantine/core";
import React from "react";
import Avatar, { genConfig } from "react-nice-avatar";
import { StarIcon } from "../../icons";

const RemainingAvatars = ({ name, position, score }) => {
  const config = genConfig({ bgColor: "#FFFFFF" });
  return (
    <>
      <Group className="w-full items-center" position="apart">
        <Group className="w-1/3">
          <Avatar style={{ width: "3rem", height: "3rem" }} {...config} />
          <Text className="font-semibold text-darkGreen-50">{name}</Text>
        </Group>
        <Text className="w-1/3 font-semibold text-darkGreen-50">{`${score} pts`}</Text>
        <Box
          className={`inline-flex border pt-2 pb-2 pl-3 pr-3 border-solid text-xs mb-1 space-x-2 text-center items-center bg-darkGreen-50 rounded-full`}
        >
          <StarIcon className="text-white" />
          <Text className="font-semibold text-base text-white">{position}</Text>
        </Box>
      </Group>
    </>
  );
};

export default RemainingAvatars;
