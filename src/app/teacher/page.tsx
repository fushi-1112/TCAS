"use client";

import { useStudentStore } from "../store/studentStore";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import Link from "next/link";

export default function TeacherPage() {
  const portfolios = useStudentStore((s) => s.portfolios) || [];

  return (
    <Card className="max-w-5xl mx-auto mt-6">
      <CardHeader>
        <CardTitle>รายชื่อนักเรียน</CardTitle>
      </CardHeader>
      <CardContent>
        {portfolios.length === 0 ? (
          <p className="text-center text-gray-500">ยังไม่มีข้อมูลนักเรียน</p>
        ) : (
          <table className="w-full border-collapse border border-gray-700 text-gray-100">
            <thead>
              <tr className="bg-gray-900">
                <th className="border p-2">รูปโปรไฟล์</th>
                <th className="border p-2">ผลงาน</th>
                <th className="border p-2">ชื่อ</th>
                <th className="border p-2">GPA</th>
                <th className="border p-2">รายละเอียด</th>
              </tr>
            </thead>
            <tbody>
              {portfolios.map((s) => (
                <tr key={s.id} className="hover:bg-gray-700">
                  <td className="border p-2 text-center">
                    {s.image ? (
                      <img src={s.image} alt={`${s.firstName} ${s.lastName}`} className="w-12 h-12 object-cover rounded-full mx-auto" />
                    ) : <span className="text-gray-400 text-sm">ไม่มี</span>}
                  </td>
                  <td className="border p-2 text-center">
                    {s.activities?.length ? (
                      <div className="flex flex-wrap gap-1 justify-center">
                        {s.activities.map((img, i) => (
                          <img key={i} src={img} alt={`กิจกรรม ${i}`} className="w-12 h-12 object-cover rounded-lg" />
                        ))}
                      </div>
                    ) : <span className="text-gray-400 text-sm">ไม่มี</span>}
                  </td>
                  <td className="border p-2">{s.firstName} {s.lastName}</td>
                  <td className="border p-2 text-center">{s.gpa.toFixed(2)}</td>
                  <td className="border p-2 text-center">
                    <Link href={`/teacher/${s.id}`}>
                      <Button variant="primary" className="px-2 py-1 text-sm">ดูรายละเอียด</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="mt-4 text-right">
          <Link href="/">
            <Button variant="secondary">กลับไปหน้าฟอร์ม</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
