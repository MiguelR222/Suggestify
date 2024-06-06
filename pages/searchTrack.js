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
    <div className="p-4">
      <h1 className="text-4xl mb-4">Search for a song</h1>
      {selectedTrack && recommendations ? (
        <div>
          <h2 className="text-2xl mb-2">Recommendations based on {selectedTrack.name}</h2>
          <ul className="space-y-2">
            {recommendations.map((rec) => (
              <li key={rec.id} className="text-lg">{rec.name} by {rec.artists[0].name}</li>
            ))}
          </ul>
          <button onClick={() => { setSelectedTrack(null); setArtistId(null); setSongId(null); }} className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-700">
            Back to all tracks
          </button>
          <br />
          <ToggleBox recommendations={recommendations} />
        </div>
      ) : (
        <div>
          {search && song && artist ? (
            <div>
              <h2 className="text-2xl mb-2">Results for {songName} by {artistName}</h2>
              <ul className="space-y-2">
                {search.items.map((rec) => (
                  <li key={rec.id}>
                    <button onClick={() => {
                      setSelectedTrack(rec); 
                      setArtistId(rec.artists[0].id);
                      setSongId(rec.id);
                    }} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                      {rec.name} by {rec.artists[0].name}
                    </button>
                  </li>
                ))}
              </ul>
              <button onClick={() => { setSong(null); setArtist(null) }} className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-700">
                Back to search
              </button>
            </div>
          ) : (
            <div>
              <input id="song" placeholder="Search for a song" onChange={(e) => setSong(e.target.value)} className="px-2 py-1 mb-2 border rounded" />
              <input id="artist" placeholder="Search for an artist" onChange={(e) => setArtist(e.target.value)} className="px-2 py-1 mb-2 border rounded" />
              <button onClick={() => { setSongName(song); setArtistName(artist); console.log(search); }} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                Search
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}