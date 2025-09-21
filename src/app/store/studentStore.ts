import { create } from "zustand";

export type Portfolio = {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  school: string;
  gpa: number;
  talent: string;
  reason: string;
  major: string;
  university: string;
  image?: string;
  activities?: string[]; 
};
type StudentStore = {
  portfolios: Portfolio[];
  addPortfolio: (p: Portfolio) => void;
};

export const useStudentStore = create<StudentStore>((set) => ({
  portfolios: [],
  addPortfolio: (p) => set((state) => ({ portfolios: [...state.portfolios, p] })),
}));
