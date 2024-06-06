import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"

export default function LoginButton() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <section className="bg-[#F2F2F2]">
          <nav className="flex justify-end items-center p-4">
            <div className="mr-4">
              <p className="font-bold text-[#014017]">{session.user.name}</p>
              <p className="text-sm text-[#025920]">{session.user.email}</p>
            </div>
            <button
              className="rounded bg-[#014017] px-4 py-2 text-sm font-medium text-[#F2F2F2] shadow hover:bg-[#41BFB3] focus:outline-none focus:ring active:bg-[#41BFB3] transition transform hover:scale-105 hover:rotate-3"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </nav>
          <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
            <div className="mx-auto max-w-xl text-center">
              <h1 className="text-3xl font-extrabold sm:text-5xl text-[#014017]">
                Suggestify
                <strong className="font-extrabold text-[#025920] sm:block">
                  {" "}
                  Great music for great people.{" "}
                </strong>
              </h1>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/searchTrack"
                  className="block w-full rounded bg-[#014017] px-12 py-3 text-sm font-medium text-[#F2F2F2] shadow hover:bg-[#41BFB3] focus:outline-none focus:ring active:bg-[#41BFB3] sm:w-auto transition transform hover:scale-110 "
                >
                  Search for Tracks
                </Link>
                <Link
                  href="/topTracks"
                  className="block w-full rounded bg-[#014017] px-12 py-3 text-sm font-medium text-[#F2F2F2] shadow hover:bg-[#41BFB3] focus:outline-none focus:ring active:bg-[#41BFB3] sm:w-auto transition transform hover:scale-110 "
                >
                  Go to Top Tracks
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }
  return (
    <>
      <section className="bg-[#F2F2F2]">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl text-[#014017]">
              Suggestify
              <strong className="font-extrabold text-[#025920] sm:block">
                {" "}
                Great music for great people.{" "}
              </strong>
            </h1>


            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                className="block w-full rounded bg-[#014017] px-12 py-3 text-sm font-medium text-[#F2F2F2] shadow hover:bg-[#41BFB3] focus:outline-none focus:ring active:bg-[#41BFB3] sm:w-auto transition transform hover:scale-105 hover:rotate-3"
                onClick={() => signIn()}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}