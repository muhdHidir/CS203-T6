import { Group, Stack, Text } from "@mantine/core";
import React from "react";
import BarChart from "./BarChart";
import IncrementChip from "./IncrementChip";
import LineChart from "./LineChart";
import "../../css/statchart.css";

const DataMetric = ({
  label,
  icon,
  value,
  unit,
  hasChart,
  increment,
  chartData,
}) => {
  return (
    <Stack
      spacing={4}
      className={`border border-solid border-gray-800 rounded-sm py-3 px-2 lg:px-4 bg-gray-50 bg-opacity-50 justify-between h-full`}
    >
      <Group
        spacing="xs"
        className="inline-flex text-xs mb-1 text-center rounded-full"
      >
        {icon}
        <Text className="text-gray-500 text-sm xl:text-md">{label}</Text>
      </Group>

      <Group className="items-end" spacing={4}>
        <Text className="font-semibold text-xl xl:text-3xl">{value}</Text>
        <Text className="text-gray-500">{unit}</Text>
        <IncrementChip className="mb-1 ml-2" increment={increment} />
      </Group>
      <div className="h-full">
        {hasChart ? (
          <LineChart data={chartData} />
        ) : (
          <BarChart data={chartData} />
        )}
      </div>
    </Stack>
  );
};

export default DataMetric;
