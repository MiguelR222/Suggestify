import { useState, useEffect } from "react";
import axios from "axios";

function encodeGenres(genres) {
  return genres.map(genre => encodeURIComponent(genre.trim())).join('%2C');
}

export default function GetRecom(track, genre, song, session) {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecom = async () => {
      if (!track || !song || !genre || !session?.accessToken) {
        setRecommendations([]); 
        return;
      }
      
      const genreQuery = genre ? encodeGenres(genre) : '';
      const options = {
        method: "GET",
        url: `https://api.spotify.com/v1/recommendations?limit=10&seed_artists=${track.artists[0].id}&seed_genres=${genreQuery}
        &seed_tracks=${track.id}&min_tempo=${song.tempo - 5}&max_tempo=${song.tempo + 5}`,
        headers: {
          Authorization: `Bearer ${session.accessToken}`
        },
      };

      try {
        const response = await axios.request(options);
        console.log(axios.request(options));
        setRecommendations(response.data.tracks); 
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
        setRecommendations([]);
      }
    };

    fetchRecom();
  }, [track, genre, song, session?.accessToken]);

  return { recommendations };
}