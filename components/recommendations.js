import useGetRecom from '../hooks/useGetRecom'

export default function TopRecom() {
    const { tracks } = useGetRecom()
    return (
      <div>
        <h1>Top Tracks</h1>
        <p>Here are your top tracks:</p>
        <ul>
          {tracks.map((track) => (
            <li key={track.id}>
              <button onClick={() => console.log(track)}>{track.name} by {track.artists[0].name}</button>
            </li>
          ))}
        </ul>
      </div>
    )
  }