import { Celebrity } from "@/types/game";

export const celebrities: Celebrity[] = [
  {
    id: "celeb-1",
    name: "A",
    image: "/images/celebrity-1.jpg",
  },
  {
    id: "celeb-2",
    name: "B",
    image: "/images/celebrity-2.jpg",
  },
  {
    id: "celeb-3",
    name: "C",
    image: "/images/celebrity-3.jpg",
  },
  {
    id: "celeb-4",
    name: "D",
    image: "/images/celebrity-4.jpg",
  },
  {
    id: "celeb-5",
    name: "E",
    image: "/images/celebrity-5.jpg",
  },
];

export const guessCelebrityQuestions = celebrities.slice(0, 3);
export const memoryGameCelebrities = celebrities.slice(0, 5);
