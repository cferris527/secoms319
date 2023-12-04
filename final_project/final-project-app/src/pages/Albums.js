import React, { useEffect, useState } from 'react';
const serverURL = "http://localhost:8080";
const Home = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const albumsResponse = await fetch(serverURL + '/albumInfo');
        const albumsData = await albumsResponse.json();
        setAlbums(albumsData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
    <h1>Albums</h1>
    <div className="grid-container">
      {albums.map((album, index)=> (
        <div className="grid-item">
            <img src={album.Image} width = "150" height = "150" alt={album.Name}/>
            <h3>{album.Name}</h3>
            <p>By: {album.Singer}</p>
            <p>Date Released: {album.Date}</p>
            <p>Songs: {album.Songs[0]}, {album.Songs[1]}, {album.Songs[2]}</p>
        </div>
      ))}
    </div>
    </div>
  );

};

export default Home;