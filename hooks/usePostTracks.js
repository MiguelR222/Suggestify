import { useState, useEffect } from "react";
import axios from "axios";

function TrackUris(recommendations) {
    return Object.values(recommendations).map(recommendation => `spotify:track:${recommendation.id}`);
  }

export default function usePostTracks(recommendations, playlist, session) {
    const [postTracks, setPostTracks] = useState(null);
    const trackUris = TrackUris(recommendations);
    
    useEffect(() => {
        const fetchPostTracks = async () => {
        if (!recommendations || !playlist || !session?.accessToken) {
            setPostTracks(null);
            return;
        }
    
        const options = {
            method: "POST",
            url: `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
                "Content-Type": "application/json",
            },
            data: {
                uris: trackUris,
                position: 0,
            },
        };
    
        try {
            const response = await axios.request(options);
            setPostTracks(response.data);
        } catch (error) {
            alert("Failed to post tracks:", error);
            setPostTracks(null);
        }
        };
    
        fetchPostTracks();
    }, [recommendations, playlist, session?.accessToken]);
    
    return { postTracks };
    }