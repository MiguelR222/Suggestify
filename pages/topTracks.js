import React, { useState } from 'react';
import useGetTracks from "@/hooks/useGetTracks"
import useGetRecom from "@/hooks/useGetRecom"
import { useSession } from "next-auth/react";

export default function TopTracks() {
  const { tracks } = useGetTracks()
  const { data: session } = useSession();
  const [selectedTrack, setSelectedTrack] = useState(null);
  const { recommendations } = useGetRecom(selectedTrack, session);

  return (
    <div>
      <h1>Top Tracks</h1>
      {selectedTrack ? (
        <div>
          <h2>Recommendations based on {selectedTrack.name}</h2>
          <ul>
            {recommendations.map((rec) => (
              <li key={rec.id}>{rec.name} by {rec.artists[0].name}</li>
            ))}
          </ul>
          <button onClick={() => setSelectedTrack(null)}>Back to all tracks</button>
        </div>
      ) : (
        <div>
          <p>Here are your top tracks:</p>
          <ul>
            {tracks.map((track) => (
              <li key={track.id}>
                <button onClick={() => setSelectedTrack(track)}>
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

