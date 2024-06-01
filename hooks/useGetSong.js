import { useState, useEffect } from "react";
import axios from "axios";

export default function GetSong(id, session) {
  const [song, setSong] = useState([]);

  useEffect(() => {
    const fetchSong = async () => {
      if (!id || !session?.accessToken) {
        setSong({}); 
        return;
      }
      const options = {
        method: "GET",
        url: `https://api.spotify.com/v1/audio-features/${id}`,
        headers: {
          Authorization: `Bearer ${session.accessToken}`
        },
      };

      try {
        const response = await axios.request(options);
        setSong(response.data); 
      } catch (error) {
        console.error("Failed to fetch song info:", error);
        setSong({});
      }
    };

    fetchSong();
  }, [id, session?.accessToken]);

  return { song };
}