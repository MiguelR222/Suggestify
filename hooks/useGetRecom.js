import { useState, useEffect } from "react";
import axios from "axios";

function encodeGenres(genres) {
  return genres.slice(0, 3).map(genre => encodeURIComponent(genre.replace(/\s/g, ''))).join('%2C');
}

export default function GetRecom(track, genre, song, session) {
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    const fetchRecom = async () => {
      if (!track || !song || !genre || !session?.accessToken) {
        setRecommendations(null); 
        return;
      }
      
      const genreQuery = genre ? encodeGenres(genre) : '';
      const options = {
        method: "GET",
        url: `https://api.spotify.com/v1/recommendations?limit=10&seed_artists=${track.artists[0].id}&seed_genres=${genreQuery}
        &seed_tracks=${track.id}&min_tempo=${song.tempo - 2.5}&max_tempo=${song.tempo + 2.5}`,
        headers: {
          Authorization: `Bearer ${session.accessToken}`
        },
      };

      try {
        const response = await axios.request(options);
        console.log(response.data.tracks);
        setRecommendations(response.data.tracks); 
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
        setRecommendations(null);
      }
    };

    fetchRecom();
  }, [track, genre, song, session?.accessToken]);

  return { recommendations };
}