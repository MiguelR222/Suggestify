import { useState, useEffect } from "react";
import axios from "axios";

export default function usePostPlaylist(playlistName, session) {
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const createPlaylist = async () => {
      if (!playlistName || !session?.accessToken) {
        setPlaylist(null);
        return;
      }

      const options = {
        method: "POST",
        url: `https://api.spotify.com/v1/users/${session.user.id}/playlists`,
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
        data: {
          name: playlistName,
          public: true,
        },
      };

      try {
        const response = await axios.request(options);
        setPlaylist(response.data);
      } catch (error) {
        alert("Failed to create playlist:", error);
        setPlaylist(null);
      }
    };

    createPlaylist();
  }, [playlistName, session?.accessToken]);


  return { playlist };
}