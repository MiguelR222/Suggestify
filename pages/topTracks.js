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
    <div className="p-4">
      <h1 className="text-4xl mb-4">Top Tracks</h1>
      {selectedTrack && recommendations ? (
        <div>
          <h2 className="text-2xl mb-2">Recommendations based on {selectedTrack.name}</h2>
          <ul className="space-y-2">
            {recommendations.map((rec) => (
              <li key={rec.id} className="text-lg">{rec.name} by {rec.artists[0].name}</li>
            ))}
          </ul>
          <button onClick={() => { setSelectedTrack(null); setArtistId(null); setSongId(null) }} className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-700">
            Back to all tracks
          </button>
          <ToggleBox recommendations={recommendations} />
        </div>
      ) : (
        <div>
          <p className="text-lg mb-2">Here are your top tracks:</p>
          <ul className="space-y-2">
            {tracks.map((track) => (
              <li key={track.id}>
                <button onClick={() => {
                  setSelectedTrack(track); 
                  setArtistId(track.artists[0].id);
                  setSongId(track.id);
                }} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                  {track.name} by {track.artists[0].name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}