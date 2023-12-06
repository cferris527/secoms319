import React, { useEffect, useState } from 'react';
const serverURL = "http://localhost:8080";
const Home = () => {
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
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

        const albumsResponse = await fetch(serverURL + '/albumInfo');
        const albumsData = await albumsResponse.json();
        setAlbums(albumsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  return (
    <div>
      <h1 className='grandTitle'>ArtistInsight</h1>
    <div className='flexContainer'>
      <div class = "homeItems">
        <h2 className='titleText'>Top Artists</h2>
        <ul class = "infoList">
          {shuffleArray(artists).slice(0,5).map((artist, index) => (
            <li key={index}>
              <div>
                <img src={artist.Image} width = "150" height = "150" alt={artist.Name}/>
                <div>
                  <h3>{index + 1}. {artist.Name}</h3>
                  {/* Add more artist details here if needed */}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div class = "homeItems">
        <h2 className='titleText'>Top Albums</h2>
        <ul class = "infoList">
          {shuffleArray(albums).slice(0,5).map((album, index) => (
            <li key={index}>
              <div>
                <img src={album.Image} width = "150" height = "150" alt={album.Name}/>
                <div>
                  <h3>{index + 1}. {album.Name}</h3>
                  {/* Add more artist details here if needed */}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div class = "homeItems">
        <h2 className='titleText'>Top Songs</h2>
        <ul class = "infoList">
          {shuffleArray(songs).slice(0,5).map((song, index) => (
            <li key={index}>
              <img src={song.Image} width = "150" height = "150" alt={song.Name} />
              <div>
                <h3>{index + 1}. {song.Name}</h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default Home;
