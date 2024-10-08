import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function GetTracks() {
  const { data: session, status } = useSession();
  const [tracks, setTracks] = useState([]);

  const fetchTracks = async () => {
    if (status !== "authenticated") {
      alert("Session not authenticated or session data not available.");
      return;
    }

    const accessToken = session?.accessToken;
    if (!accessToken) {
      alert("Access token is not available.");
      return;
    }

    const options = {
      method: "GET",
      url: "https://api.spotify.com/v1/me/top/tracks",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    };

    try {
      const response = await axios.request(options);
      setTracks(response.data.items); // Assuming the data you need is in the items array
    } catch (error) {
      alert("Failed to fetch tracks:", error);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchTracks();
    }
  }, [status]); // Depend on the authentication status

  return { tracks };
}
