"use client";

import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useStudentStore, Portfolio } from "../store/studentStore";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import Link from "next/link";
import Image from "next/image";

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
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => setActivityPreviews((prev) => [...prev, reader.result as string]);
        reader.readAsDataURL(file);
      });
      setActivityPreviews([]);
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
          {/* ...ฟอร์มอื่นๆ เหมือนเดิม... */}

          {/* รูปโปรไฟล์ */}
          <div>
            <label className="block text-sm font-medium mb-1">รูปโปรไฟล์</label>
            <input type="file" accept="image/*" onChange={handleProfileImage} className="mt-1 border border-gray-600 bg-gray-700 text-gray-100 p-2 rounded-lg w-full" />
            {profilePreview && (
              <Image
                src={profilePreview}
                alt="preview"
                width={128}
                height={128}
                className="mt-2 rounded-full border border-gray-600 object-cover"
              />
            )}
          </div>

          {/* กิจกรรม/รางวัล/ผลงาน */}
          <div>
            <label className="block text-sm font-medium mb-1">กิจกรรม / รางวัล / ผลงาน</label>
            <input type="file" accept="image/*" multiple onChange={handleActivityImages} className="mt-1 border border-gray-600 bg-gray-700 text-gray-100 p-2 rounded-lg w-full" />
            {activityPreviews.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {activityPreviews.map((img, i) => (
                  <Image
                    key={i}
                    src={img}
                    alt={`activity ${i}`}
                    width={128}
                    height={128}
                    className="rounded-lg border object-cover"
                  />
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
