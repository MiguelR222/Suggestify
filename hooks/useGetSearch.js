import { useState, useEffect } from "react";
import axios from "axios";

function encodeTracks(track) {
  return encodeURIComponent(track.trim().replace(/\s/g, '+'));
}

export default function useGetSearch(track, artist, session) {
  const [search, setSearch] = useState(null);

  useEffect(() => {
      const fetchSearch = async () => {
          if ((!track && !artist) || !session?.accessToken) {
              setSearch(null);
              return;
          }
        const trackQuery = track ? encodeTracks(track) : '';
        const artistQuery = artist ? encodeTracks(artist) : '';
        const options = {
          method: "GET",
          url: `https://api.spotify.com/v1/search?q=${trackQuery}%2C${artistQuery}&type=track&limit=5`,
          headers: {
            Authorization: `Bearer ${session.accessToken}`
          },
        };
          
      try {
        const response = await axios.request(options);
        console.log(response.data);
        setSearch(response.data.tracks)
        console.log(search); 
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
        setSearch(null);
      }
    };

    fetchSearch();
  }, [track, artist, session?.accessToken]);

  useEffect(() => {
    console.log(search);
  }, [search]);


  return { search };
}