import React, { useEffect, useState } from 'react';
const serverURL = "http://localhost:8080";
const Home = () => {
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artistsResponse = await fetch(serverURL + '/artistInfo');
        const artistsData = await artistsResponse.json();
        setArtists(artistsData);

        const songsResponse = await fetch(serverURL + '/songInfo');
        const songsData = await songsResponse.json();
        setSongs(songsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='flexContainer'>
      <div style={{ flex: 1 }}>
        <h2 className='titleText'>Artists</h2>
        <ul>
          {artists.map((artist, index) => (
            <li key={index}>
              <img src={artist.Image} alt={artist.Name} />
              <div>
                <h3>{artist.Name}</h3>
                <p>Born: {artist.Born}</p>
                <p>Hometown: {artist.Hometown}</p>
                {/* Add more artist details here if needed */}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flex: 1 }}>
        <h2 className='titleText'>Songs</h2>
        <ul>
          {songs.map((song, index) => (
            <li key={index}>
              <img src={song.Image} alt={song.Name} />
              <div>
                <h3>{song.Name}</h3>
                <p>Duration: {song.Duration}</p>
                <p>Plays: {song.Plays}</p>
                <p>Album: {song.Album}</p>
                {/* Add more song details here if needed */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
