// components/StudentDetail.tsx
import { useParams } from "react-router-dom";
import { useStudentStore } from "../store/studentStore";

export default function StudentDetail() {
  const { id } = useParams();
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
      {student.image && <img src={student.image} alt="profile" className="w-40 h-40 object-cover" />}
    </div>
  );
}
