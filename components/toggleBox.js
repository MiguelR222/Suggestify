import { useState } from 'react';
import usePostPlaylist from "@/hooks/usePostPlaylist"
import { useSession } from "next-auth/react";
import usePostTracks from '@/hooks/usePostTracks';

export default function ToggleBox({ recommendations }) {
  const [playlistInput, setPlaylistInput] = useState(null);  
  const [playlistName, setPlaylistName] = useState(null);
  const { data: session } = useSession();
  const {playlist} = usePostPlaylist(playlistName, session);
  const [isVisible, setIsVisible] = useState(false);
  const { postTracks } = usePostTracks(recommendations, playlist, session);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleVisibility}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Create Playlist
      </button>
      {isVisible && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={toggleVisibility}
          ></div>
          <div className="fixed inset-0 flex items-center justify-center z-20">
            <div className="bg-white p-4 border border-gray-300 rounded shadow-lg relative">
              <button
                onClick={toggleVisibility}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
              <input
                id="playlist" placeholder="Enter playlist name" className="px-4 py-2 border border-gray-300 rounded mb-2 w-full"onChange={(e) => setPlaylistInput(e.target.value)
              }
              />
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"  onClick={() => { setPlaylistName((playlistInput)) }}
              >
                Add
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
