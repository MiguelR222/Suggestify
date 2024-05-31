import Image from "next/image";
import { Inter } from "next/font/google";
import LoginButton from "@/components/loginButton";
import TopTracks from "@/pages/topTracks";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
    <LoginButton />
      </>
  )
}