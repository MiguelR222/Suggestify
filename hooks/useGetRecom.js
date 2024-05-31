import { useState, useEffect } from "react";
import axios from "axios";

export default function useGetRecom(track, session) {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecom = async () => {
      if (!track || !session?.accessToken) {
        setRecommendations([]); 
        return;
      }

      const options = {
        method: "GET",
        url: `https://api.spotify.com/v1/recommendations?limit=10&seed_artists=${track.artists[0].id}&seed_tracks=${track.id}&min_tempo=${track.tempo-10}&max_tempo=${track.tempo+10}`,
        headers: {
          Authorization: `Bearer ${session.accessToken}`
        },
      };

      try {
        const response = await axios.request(options);
        setRecommendations(response.data.tracks); // Assuming the correct property is 'tracks'
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
        setRecommendations([]);
      }
    };

    fetchRecom();
  }, [track, session?.accessToken]); // Dependency array includes track and accessToken

  return { recommendations };
}