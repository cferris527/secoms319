import React, { useEffect, useState } from 'react';
const serverURL = "http://localhost:8080";
const Home = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const songsResponse = await fetch(serverURL + '/songInfo');
        const songData = await songsResponse.json();
        setSongs(songData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid-container">
      {songs.map((song, index)=> (
        <div className="grid-item">
            <img src={song.Image} width = "150" height = "150" alt={song.Name}/>
            <h3>{song.Name}</h3>
            <p>By: {song.Artist}</p>
            <p>Duration: {song.Duration}</p>
            <p>Plays: {song.Plays}</p>
            <p>From Album: {song.Album}</p>
        </div>
      ))}
    </div>
  );

};

export default Home;