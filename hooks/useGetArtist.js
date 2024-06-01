import { useState, useEffect } from "react";
import axios from "axios";

export default function GetArtist(id, session) {
  const [artist, setArtist] = useState([]);

  useEffect(() => {
    const fetchArtist = async () => {
      if (!id || !session?.accessToken) {
        setArtist({}); 
        return;
      }
      const options = {
        method: "GET",
        url: `https://api.spotify.com/v1/artists/${id}`,
        headers: {
          Authorization: `Bearer ${session.accessToken}`
        },
      };

      try {
        const response = await axios.request(options);
        setArtist(response.data); 
      } catch (error) {
        console.error("Failed to fetch artist info:", error);
        setArtist({});
      }
    };

    fetchArtist();
  }, [id, session?.accessToken]);

  return { artist };
}