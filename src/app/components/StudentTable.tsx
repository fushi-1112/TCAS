// components/StudentTable.tsx
import { useStudentStore } from "../store/studentStore";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function StudentTable() {
  const { portfolios } = useStudentStore();
  const [sortBy, setSortBy] = useState<"name" | "gpa">("name");

  const sorted = [...portfolios].sort((a, b) => {
    if (sortBy === "name") return a.firstName.localeCompare(b.firstName);
    return b.gpa - a.gpa;
  });

  return (
    <div className="p-4">
      <div className="mb-2">
        <button onClick={() => setSortBy("name")} className="mr-2">เรียงตามชื่อ</button>
        <button onClick={() => setSortBy("gpa")}>เรียงตาม GPA</button>
      </div>
      <table className="border w-full">
        <thead>
          <tr>
            <th>ชื่อ</th>
            <th>GPA</th>
            <th>รายละเอียด</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((s) => (
            <tr key={s.id}>
              <td>{s.firstName} {s.lastName}</td>
              <td>{s.gpa}</td>
              <td><Link to={`/detail/${s.id}`}>ดูรายละเอียด</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
