"use client";

import {
  useEffect,
  useState,
} from "react";

export default function AdminUserTable() {
  const [users, setUsers] =
    useState<any[]>([]);

  async function fetchUsers() {
    const response = await fetch(
      "/api/admin/users"
    );

    const result =
      await response.json();

    setUsers(result.data || []);
  }

  useEffect(() => {
    fetchUsers();
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
              Email
            </th>

          </tr>
        </thead>

        <tbody>

          {users.map((user) => (
            <tr
              key={user._id}
              className="border-t border-white/5"
            >

              <td className="p-5">
                {user.name}
              </td>

              <td className="p-5">
                {user.email}
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}