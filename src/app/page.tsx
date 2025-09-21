"use client";

import StudentForm from "./components/PortfolioForm"; // หรือ path ที่ถูกต้องของคุณ

export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Portfolio TCAS69</h1>
      <StudentForm />
    </main>
  );
}
