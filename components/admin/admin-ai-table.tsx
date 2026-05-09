"use client";

import {
  useEffect,
  useState,
} from "react";

export default function AdminAITable() {
  const [ais, setAIs] =
    useState<any[]>([]);

  async function fetchAIs() {
    const response = await fetch(
      "/api/admin/ais"
    );

    const result =
      await response.json();

    setAIs(result.data || []);
  }

  useEffect(() => {
    fetchAIs();
  }, []);

  return (
    <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl">

      <table className="w-full text-white">

        <thead className="bg-white/5">

          <tr>

            <th className="p-5 text-left">
              Name
            </th>

            <th className="p-5 text-left">
              Domain
            </th>

            <th className="p-5 text-left">
              Rating
            </th>

          </tr>
        </thead>

        <tbody>

          {ais.map((ai) => (
            <tr
              key={ai._id}
              className="border-t border-white/5"
            >

              <td className="p-5">
                {ai.name}
              </td>

              <td className="p-5">
                {ai.domain}
              </td>

              <td className="p-5">
                {ai.rating}
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}