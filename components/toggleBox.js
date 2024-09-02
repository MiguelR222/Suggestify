import { useState, useEffect} from 'react';
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

  useEffect(() => {
    if (playlist && postTracks) {
      alert('Playlist added to your library');
    }
  }, [playlist, postTracks]);


return (
  <div className="mt-3 relative">
    <button
      onClick={toggleVisibility}
      className="px-12 py-3 bg-[#014017] text-[#F2F2F2] rounded shadow hover:bg-[#41BFB3] text-sm font-medium focus:outline-none focus:ring active:bg-[#41BFB3] sm:w-auto transition transform hover:scale-105 hover:rotate-3"
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
          <div className="bg-[#F2F2F2] p-4 border border-[#014017] rounded shadow-lg relative">
            <button
              onClick={toggleVisibility}
              className="absolute top-2 right-2 text-[#014017] hover:text-[#025920]"
            >
              &times;
            </button>
            <input
              id="playlist" placeholder="Enter playlist name" className="px-2 py-1 mb-2 border rounded text-black" onChange={(e) => setPlaylistInput(e.target.value)}
            />
            <button
              className="px-12 py-3 bg-[#014017] text-[#F2F2F2] rounded shadow hover:bg-[#41BFB3] text-sm font-medium focus:outline-none focus:ring active:bg-[#41BFB3] sm:w-auto transition transform hover:scale-105 hover:rotate-3"
              onClick={() => { setPlaylistName((playlistInput)) }}>
              Add
            </button>
          </div>
        </div>
      </>
    )}
  </div>
);
}
