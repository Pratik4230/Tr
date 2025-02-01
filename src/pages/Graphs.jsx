import React from "react";
import BarChart from "../components/BarChart";
import DoughnutChart from "../components/DoughnutChart";

const Graphs = () => {
  return (
    <div>
      <h1>Graphs </h1>

      <BarChart />
      <hr />
      <DoughnutChart />
    </div>
  );
};

export default Graphs;
