"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    month: "Jan",

    users: 400,
  },

  {
    month: "Feb",

    users: 800,
  },

  {
    month: "Mar",

    users: 1200,
  },

  {
    month: "Apr",

    users: 1800,
  },

  {
    month: "May",

    users: 2400,
  },
];

export default function AdminChart() {
  return (
    <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">

      <h2 className="mb-6 text-3xl font-bold text-white">
        Platform Growth
      </h2>

      <div className="h-[350px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={data}>

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="users"
              stroke="#06B6D4"
              strokeWidth={4}
            />

          </LineChart>

        </ResponsiveContainer>
      </div>
    </div>
  );
}