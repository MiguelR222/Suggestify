import React, { useState } from 'react';
import useGetTracks from "@/hooks/useGetTracks"
import useGetRecom from "@/hooks/useGetRecom"
import useGetArtist from "@/hooks/useGetArtist"
import useGetSong from "@/hooks/useGetSong"
import { useSession } from "next-auth/react";
import ToggleBox from '@/components/toggleBox';

export default function TopTracks() {
  const { tracks } = useGetTracks()
  const { data: session } = useSession();
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [artistId, setArtistId] = useState(null);
  const { artist } = useGetArtist(artistId, session);
  const [songId, setSongId] = useState(null);
  const {song} = useGetSong(songId, session);
  const { recommendations } = useGetRecom(selectedTrack, artist.genres, song, session);

return (
  <section className="bg-[#F2F2F2]">
    <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-full lg:items-center">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-extrabold sm:text-5xl text-[#014017]">Top Tracks</h1>
        {selectedTrack && recommendations ? (
          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl text-[#025920] mb-2">Recommendations based on {selectedTrack.name}</h2>
            <ul className="space-y-2">
              {recommendations.map((rec) => (
                <li key={rec.id} className="text-lg text-[#025920]">{rec.name} by {rec.artists[0].name}</li>
              ))}
            </ul>
<button onClick={() => { setSelectedTrack(null); setArtistId(null); setSongId(null) }} className="mt-4 mx-auto block rounded bg-[#038C33] px-12 py-3 text-sm font-medium text-[#F2F2F2] shadow hover:bg-[#41BFB3] focus:outline-none focus:ring active:bg-[#41BFB3] sm:w-auto transition transform hover:scale-105 hover:rotate-3">
  Back to all tracks
</button>
            <ToggleBox recommendations={recommendations} />
          </div>
        ) : (
          <div>
            <h2 className="text-lg text-[#025920] mb-2">Here are your top tracks:</h2>
            <ul className="space-y-2">
              {tracks.map((track) => (
                <li key={track.id}>
                  <button onClick={() => {
                    setSelectedTrack(track); 
                    setArtistId(track.artists[0].id);
                    setSongId(track.id);
                  }} className="block w-full rounded bg-[#014017] px-12 py-3 text-sm font-medium text-[#F2F2F2] shadow hover:bg-[#41BFB3] focus:outline-none focus:ring active:bg-[#41BFB3] sm:w-auto transition transform hover:scale-105 hover:rotate-3">
                    {track.name} by {track.artists[0].name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  </section>
  )
}