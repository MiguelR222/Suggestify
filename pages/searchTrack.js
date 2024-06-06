import React, { useState, useEffect } from 'react';
import useGetSearch from "@/hooks/useGetSearch"
import useGetArtist from "@/hooks/useGetArtist"
import useGetSong from "@/hooks/useGetSong"
import useGetRecom from "@/hooks/useGetRecom"
import { useSession } from "next-auth/react";
import ToggleBox from '@/components/toggleBox';

export default function SearchTrack() {
  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [songName, setSongName] = useState(null);
  const [artistName, setArtistName] = useState(null);
  const { data: session } = useSession();
  const { search } = useGetSearch(songName, artistName, session);
  const [songId, setSongId] = useState(null);
  const [artistId, setArtistId] = useState(null);
  const { artist: artistGenre } = useGetArtist(artistId, session);
  const { song: songInfo } = useGetSong(songId, session);
  const { recommendations } = useGetRecom(selectedTrack, artistGenre.genres, songInfo, session);

  return (
    <section className="bg-[#F2F2F2] min-h-screen">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-full lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl text-[#014017]">Search Tracks</h1>
          {selectedTrack && recommendations ? (
            <div>
              <h2 className="text-2xl font-extrabold sm:text-3xl text-[#025920] mb-2">Recommendations based on {selectedTrack.name}</h2>
              <ul className="space-y-2">
                {recommendations.map((rec) => (
                  <li key={rec.id} className="text-lg text-[#025920]">{rec.name} by {rec.artists[0].name}</li>
                ))}
              </ul>
              <button onClick={() => { setSelectedTrack(null); setArtistId(null); setSongId(null) }} className="mx-auto block rounded bg-[#014017] px-12 py-3 text-sm font-medium text-[#F2F2F2] shadow hover:bg-[#41BFB3] focus:outline-none focus:ring active:bg-[#41BFB3] sm:w-auto transition transform hover:scale-105 hover:rotate-3">
                Back to search
              </button>
              <ToggleBox recommendations={recommendations} />
            </div>
          ) : (
            <div>
              {search && song && artist ? (
                <div>
                  <h2 className="text-2xl font-extrabold sm:text-3xl text-[#025920] mb-2">Results for {songName} by {artistName}</h2>
                  <ul className="space-y-2">
                    {search.items.map((rec) => (
                      <li key={rec.id}>
                        <button onClick={() => {
                          setSelectedTrack(rec);
                          setArtistId(rec.artists[0].id);
                          setSongId(rec.id);
                        }} className="mx-auto block rounded bg-[#014017] px-12 py-3 text-sm font-medium text-[#F2F2F2] shadow hover:bg-[#41BFB3] focus:outline-none focus:ring active:bg-[#41BFB3] sm:w-auto transition transform hover:scale-105 hover:rotate-3">
                          {rec.name} by {rec.artists[0].name}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => { setSong(null); setArtist(null) }} className="mt-4 mx-auto block rounded bg-[#038C33] px-12 py-3 text-sm font-medium text-[#F2F2F2] shadow hover:bg-[#41BFB3] focus:outline-none focus:ring active:bg-[#41BFB3] sm:w-auto transition transform hover:scale-105 hover:rotate-3">
                    Back to search
                  </button>
                </div>
              ) : (
                <div>
                  <input id="song" placeholder="Search for a song" onChange={(e) => setSong(e.target.value)} className="px-2 py-1 mb-2 border rounded" />
                  <input id="artist" placeholder="Search for an artist" onChange={(e) => setArtist(e.target.value)} className="px-2 py-1 mb-2 border rounded" />
                  <button onClick={() => { setSongName(song); setArtistName(artist); console.log(search); }} className="mx-auto block rounded bg-[#038C33] px-12 py-3 text-sm font-medium text-[#F2F2F2] shadow hover:bg-[#41BFB3] focus:outline-none focus:ring active:bg-[#41BFB3] sm:w-auto transition transform hover:scale-105 hover:rotate-3">
                    Search
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}