import { Inter } from "next/font/google";
import LoginButton from "@/components/loginButton";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <LoginButton/>
      </>
  )
}