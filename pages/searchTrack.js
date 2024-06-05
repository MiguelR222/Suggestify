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
    <div>
      <h1>Search for a song</h1>
      {selectedTrack && recommendations ? (
        <div>
          <h2>Recommendations based on {selectedTrack.name}</h2>
          <ul>
            {recommendations.map((rec) => (
              <li key={rec.id}>{rec.name} by {rec.artists[0].name}</li>
            ))}
          </ul>
          <button onClick={() => { setSelectedTrack(null); setArtistId(null); setSongId(null); }}>Back to all tracks</button>
          <br />
          <ToggleBox/>

        </div>
      ) : (
        <div>
          {search && song && artist ? (
            <div>
              <h2>Results for {songName} by {artistName}</h2>
              <ul>
                {search.items.map((rec) => (
                  <li key={rec.id}>
                    <button onClick={() => {
                      setSelectedTrack(rec); 
                      setArtistId(rec.artists[0].id);
                      setSongId(rec.id);
                    }}>
                      {rec.name} by {rec.artists[0].name}
                    </button>
                  </li>
                ))}
              </ul>
              <button onClick={() => { setSong(null); setArtist(null) }}>Back to search</button>
            </div>
          ) : (
            <div>
              <input id="song" placeholder="Search for a song" onChange={(e) => setSong(e.target.value)} />
              <input id="artist" placeholder="Search for an artist" onChange={(e) => setArtist(e.target.value)} />
              <button onClick={() => { setSongName(song); setArtistName(artist); console.log(search); }}>Search</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}