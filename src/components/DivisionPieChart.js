import React from "react";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";

function DivisionPieChart({ contests }) {
  const divisionCounts = contests.reduce((acc, contest) => {
    const division = contest.name.match(/Div\.?\s*\d+/i);
    if (division) {
      const div = division[0].toLowerCase();
      acc[div] = (acc[div] || 0) + 1;
    } else {
      acc["other"] = (acc["other"] || 0) + 1;
    }
    return acc;
  }, {});

  const data = Object.keys(divisionCounts).map((key) => ({
    name: key.toUpperCase(),
    value: divisionCounts[key],
  }));

  console.log(data);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            fill="#8884d8"
            label
          />
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DivisionPieChart;
