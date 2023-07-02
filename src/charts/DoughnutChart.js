import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";

const DoughnutChart = () => {
  const data = {
    labels: [
      "Dumbbell",
      "Treadmill",
      "Barbell",
      "Weight Plate",
      "Kettle Bell",
      "Yoga Mat",
    ],
    datasets: [
      {
        data: [12, 6, 6, 20, 10, 20],
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
