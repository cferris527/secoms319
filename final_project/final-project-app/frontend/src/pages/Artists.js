import React, { useEffect, useState } from 'react';
const serverURL = "http://localhost:8080";
const Home = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artistsResponse = await fetch(serverURL + '/artistInfo');
        const artistsData = await artistsResponse.json();
        setArtists(artistsData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
    <h1>Artists</h1>

    <div className="grid-container">
      {artists.map((artist, index)=> (
        <div className="grid-item">
            <img src={artist.Image} width = "150" height = "150" alt={artist.Name}/>
            <h3>{artist.Name}</h3>
            <p>Born: {artist.Born}</p>
            <p>Hometown: {artist.Hometown}</p>
            <p>Fun fact: {artist.FunFact}</p>
            <p>Album: {artist.Album}</p>
        </div>
      ))}
    </div>
    </div>
  );

};

export default Home;