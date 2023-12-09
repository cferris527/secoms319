import React, { useEffect, useState } from 'react';
const serverURL = "http://localhost:3080";
const Home = () => {
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const songsResponse = await fetch(serverURL + '/songs');
        const songData = await songsResponse.json();
        setSongs(songData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
        <h1>Songs</h1>

        <input className='searchBar'
          type="text"
          placeholder="Search Artists"
          onChange={(e) => setSearch(e.target.value)}
        />

      <div className='blackout'>
        <div className="grid-container">
          {songs.filter((song) =>
            song.Name.toLowerCase().includes(search.toLowerCase())
          )
            .map((song, index) => (
              <div className="grid-item">
                <img src={song.Image} width="150" height="150" alt={song.Name} />
                <h3>{song.Name}</h3>
                <p>By: {song.Artist}</p>
                <p>Duration: {song.Duration}</p>
                <p>Plays: {song.Plays}</p>
                <p>From Album: {song.Album}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

};

export default Home;