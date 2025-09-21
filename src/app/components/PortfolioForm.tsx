"use client";

import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useStudentStore, Portfolio } from "../store/studentStore";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import Link from "next/link";

export default function PortfolioForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<Portfolio>();
  const addPortfolio = useStudentStore((s) => s.addPortfolio);

  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [activityPreviews, setActivityPreviews] = useState<string[]>([]);

  const handleProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleActivityImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setActivityPreviews([]); // ล้างก่อน loop
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => setActivityPreviews((prev) => [...prev, reader.result as string]);
        reader.readAsDataURL(file);
      });
    }
  };

  const onSubmit = (data: Portfolio) => {
    addPortfolio({
      ...data,
      id: uuidv4(),
      gpa: Number(data.gpa),
      image: profilePreview || "",
      activities: activityPreviews,
    });
    alert("บันทึกเรียบร้อยแล้ว!");
  };

  return (
    <Card className="max-w-xl mx-auto mt-6">
      <CardHeader>
        <CardTitle>แบบฟอร์ม Portfolio</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* ชื่อและนามสกุล */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Input {...register("firstName", { required: "กรุณากรอกชื่อ" })} placeholder="ชื่อ" />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
              <Input {...register("lastName", { required: "กรุณากรอกนามสกุล" })} placeholder="นามสกุล" />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
            </div>
          </div>

          {/* ที่อยู่ */}
          <div>
            <Input {...register("address", { required: "กรุณากรอกที่อยู่" })} placeholder="ที่อยู่" />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
          </div>

          {/* เบอร์โทร & โรงเรียน */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Input {...register("phone", { 
                required: "กรุณากรอกเบอร์โทรศัพท์",
                pattern: { value: /^[0-9]{10}$/, message: "เบอร์โทรต้องมี 10 ตัวเลข" }
              })} placeholder="เบอร์โทรศัพท์" />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>
            <div>
              <Input {...register("school", { required: "กรุณากรอกโรงเรียน" })} placeholder="โรงเรียน" />
              {errors.school && <p className="text-red-500 text-sm mt-1">{errors.school.message}</p>}
            </div>
          </div>

          {/* GPA & Talent */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Input type="number" step="0.01" {...register("gpa", { 
                required: "กรุณากรอก GPA",
                min: { value: 0, message: "GPA ต้องมากกว่าหรือเท่ากับ 0" },
                max: { value: 4, message: "GPA ต้องไม่เกิน 4" }
              })} placeholder="GPA" />
              {errors.gpa && <p className="text-red-500 text-sm mt-1">{errors.gpa.message}</p>}
            </div>
            <div>
              <Input {...register("talent", { required: "กรุณากรอกความสามารถพิเศษ" })} placeholder="ความสามารถพิเศษ" />
              {errors.talent && <p className="text-red-500 text-sm mt-1">{errors.talent.message}</p>}
            </div>
          </div>

          {/* เหตุผล */}
          <div>
            <Input {...register("reason", { required: "กรุณากรอกเหตุผลในการสมัคร" })} placeholder="เหตุผลในการสมัคร" />
            {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason.message}</p>}
          </div>

          {/* สาขา & มหาวิทยาลัย */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Input {...register("major", { required: "กรุณากรอกสาขาที่เลือก" })} placeholder="สาขาที่เลือก" />
              {errors.major && <p className="text-red-500 text-sm mt-1">{errors.major.message}</p>}
            </div>
            <div>
              <Input {...register("university", { required: "กรุณากรอกมหาวิทยาลัย" })} placeholder="มหาวิทยาลัย" />
              {errors.university && <p className="text-red-500 text-sm mt-1">{errors.university.message}</p>}
            </div>
          </div>

          {/* รูปโปรไฟล์ */}
          <div>
            <label className="block text-sm font-medium mb-1">รูปโปรไฟล์</label>
            <input type="file" accept="image/*" onChange={handleProfileImage} className="mt-1 border border-gray-600 bg-gray-700 text-gray-100 p-2 rounded-lg w-full" />
            {profilePreview && <img src={profilePreview} alt="preview" className="w-32 h-32 mt-2 object-cover rounded-full border border-gray-600" />}
          </div>

          {/* รูปกิจกรรม/รางวัล/ผลงาน */}
          <div>
            <label className="block text-sm font-medium mb-1">กิจกรรม / รางวัล / ผลงาน</label>
            <input type="file" accept="image/*" multiple onChange={handleActivityImages} className="mt-1 border border-gray-600 bg-gray-700 text-gray-100 p-2 rounded-lg w-full" />
            {activityPreviews.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {activityPreviews.map((img, i) => (
                  <img key={i} src={img} alt={`activity ${i}`} className="w-32 h-32 object-cover rounded-lg border" />
                ))}
              </div>
            )}
          </div>

          <Button type="submit" variant="primary">บันทึกข้อมูล</Button>
        </form>

        <div className="mt-4 flex justify-end">
          <Link href="/teacher">
            <Button variant="secondary">ไปหน้าของอาจารย์</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
