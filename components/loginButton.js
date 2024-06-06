import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginButton() {
  const { data: session } = useSession()
      if (session) {
        return (
          <>
            <section className="bg-gray-50">
              <nav className="flex justify-end items-center p-4">
                <div className="mr-4">
                  <p className="font-bold">{session.user.name}</p>
                  <p className="text-sm">{session.user.email}</p>
                </div>
                <button
                  className="rounded bg-sky-900 px-4 py-2 text-sm font-medium text-white shadow hover:bg-sky-700 focus:outline-none focus:ring active:bg-red-500"
                  onClick={() => signOut()} 
                >
                  Sign Out
                </button>
              </nav>
              <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
                <div className="mx-auto max-w-xl text-center">
                  <h1 className="text-3xl font-extrabold sm:text-5xl">
                    Sugestify
                    <strong className="font-extrabold text-sky-950 sm:block">
                      {" "}
                      Great music for great people.{" "}
                    </strong>
                  </h1>
        
                  <p className="mt-4 sm:text-xl/relaxed">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
                    illo tenetur fuga ducimus numquam ea!
                  </p>
        
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <a
                      href="/searchTrack"
                      className="block w-full rounded bg-sky-900 px-12 py-3 text-sm font-medium text-white shadow hover:bg-sky-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                    >
                      Search for Tracks
                    </a>
                    <a
                      href="/topTracks"
                      className="block w-full rounded bg-sky-900 px-12 py-3 text-sm font-medium text-white shadow hover:bg-sky-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                    >
                      Go to Top Tracks
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </>
        )
        
      }
  return (
    <>
     <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Sugestify
            <strong className="font-extrabold text-sky-950 sm:block">
              {" "}
              Great music for great people.{" "}
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            illo tenetur fuga ducimus numquam ea!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              className="block w-full rounded bg-sky-900 px-12 py-3 text-sm font-medium text-white shadow hover:bg-sky-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
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
