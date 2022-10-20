import React, { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function LineChart({ data }) {
  const didMount = useRef(false);
  const [yearNumber, setYearNumber] = useState(2);
  const [labels, setLabels] = useState(["Year 0", "Year 1"]);
  const [state, setState] = useState({
    labels: labels,
    data: data,
  });

  useEffect(() => {
    if (didMount.current) {
      setYearNumber(yearNumber + 1);
      setLabels((prevState) => [...prevState, `Year ${yearNumber}`]);
      
      setState({
        labels: labels,
        data: data,
      });
    } else {
      didMount.current = true;
    }
  }, [data]);
  return (
    <div className="h-full">
      <Line
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: false,
              text: "Chart.js Line Chart",
            },
          },
          legend: {
            display: false,
          },

          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                display: false,

                drawBorder: false,
              },
              ticks: {
                display: false,
              },
              min: 0,
            },
          },
        }}
        data={{
          labels,
          datasets: [
            {
              fill: true,
              fillColor: "gradient",
              label: "Cash",
              lineTension: 0.5,
              data: state.data,
              borderColor: "#245A44",
              backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                gradient.addColorStop(0, "#245A44");
                gradient.addColorStop(1, "#75c8a6");
                return gradient;
              },
            },
          ],
        }}
      />
    </div>
  );
}
