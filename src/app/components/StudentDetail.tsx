"use client";

import { useStudentStore } from "../store/studentStore";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function StudentDetail() {
  const params = useParams();
  const id = params.id;
  const student = useStudentStore((s) => s.portfolios.find((p) => p.id === id));

  if (!student) return <p>ไม่พบนักเรียน</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl">{student.firstName} {student.lastName}</h2>
      <p>โรงเรียน: {student.school}</p>
      <p>GPA: {student.gpa}</p>
      <p>สาขา: {student.major} ({student.university})</p>
      <p>Talent: {student.talent}</p>
      <p>เหตุผล: {student.reason}</p>
      {student.image && (
        <Image
          src={student.image}
          alt="profile"
          width={160}
          height={160}
          className="object-cover rounded-full"
        />
      )}
    </div>
  );
}
