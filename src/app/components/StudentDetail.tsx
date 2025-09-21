"use client";

import { useParams, useRouter } from "next/navigation";
import { useStudentStore } from "../store/studentStore";
import Image from "next/image";

export default function StudentDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const student = useStudentStore((state) =>
    (state.portfolios ?? []).find((s) => s.id === id)
  );

  if (!student) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 text-lg">ไม่พบข้อมูลนักศึกษา</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={() => router.back()}
        >
          กลับ
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-800 shadow-xl rounded-xl text-gray-100">
      {/* รูปนักเรียน */}
      {student.image && (
        <div className="flex justify-center mb-6">
          <img
            src={student.image}
            alt={`${student.firstName} ${student.lastName}`}
            className="w-40 h-40 object-cover rounded-full border-4 border-blue-500 shadow-lg"
          />
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6 text-center">
        {student.firstName} {student.lastName}
      </h1>

      {/* ข้อมูลพื้นฐาน */}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-200">
        <li><strong>ชื่อ:</strong> {student.firstName}</li>
        <li><strong>นามสกุล:</strong> {student.lastName}</li>
        <li><strong>ที่อยู่:</strong> {student.address}</li>
        <li><strong>เบอร์โทรศัพท์:</strong> {student.phone}</li>
        <li><strong>โรงเรียน:</strong> {student.school}</li>
        <li><strong>GPA:</strong> {student.gpa.toFixed(2)}</li>
        <li><strong>ความสามารถพิเศษ:</strong> {student.talent}</li>
        <li><strong>เหตุผลในการสมัคร:</strong> {student.reason}</li>
        <li><strong>สาขาที่เลือก:</strong> {student.major}</li>
        <li><strong>มหาวิทยาลัย:</strong> {student.university}</li>
      </ul>

      {/* กิจกรรม / รางวัล / ผลงาน */}
      {student.activities && student.activities.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">กิจกรรม / รางวัล / ผลงาน</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {student.activities.map((act, idx) => (
              <img
                key={idx}
                src={act}
                alt={`Activity ${idx + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      )}

      {/* ปุ่มกลับ */}
      <div className="flex justify-center mt-8">
        <button
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition shadow-md"
          onClick={() => router.back()}
        >
          กลับ
        </button>
      </div>
    </div>
  );
}
