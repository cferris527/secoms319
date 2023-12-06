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

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function compareArtists(artist_1, artist_2) {
    var artist_1_score = 0;
    var artist_2_score = 0;

    for (var i = 0; i < songs.length; ++i) {
      if (songs[i].Artist === artist_1.Name) {
        artist_1_score += songs[i].Plays;
      } else if (songs[i].Artist === artist_2.Name) {
        artist_2_score += songs[i].Plays;
      }
    }

    if (artist_1_score > artist_2_score) {
      return 1;
    } else {
      return 2;
    }
  }

  const setArtist1String = (artists) => {
    if (artists.length >= 2) {
      if (compareArtists(artists[0].Name, artists[1].Name) === 1) {
        return artists[0].Name + "; Winner";
      }
      return artists[0].Name;
    }
    return "";
  }

  const setArtist2String = (artists) => {
    if (artists.length >= 2) {
      if (compareArtists(artists[0].Name, artists[1].Name) === 2) {
        return artists[1].Name + "; Winner";
      }
      return artists[1].Name;
    }
    return "";
  }

  const setArtist1TopSong = (artists) => {
    for (var i = 0; i < songs.length; ++i) {
        if (songs[i].Artist == artists[0].Name) 
        {
            return "Most played song: " + songs[i].Name + " : " + songs[i].Plays + " plays";
        }
    }
    return "";
  }

  const setArtist2TopSong = (artists) => {
    for (var i = 0; i < songs.length; ++i) {
        if (songs[i].Artist == artists[1].Name) 
        {
            return "Most played song: " + songs[i].Name + " : " + songs[i].Plays + " plays";
        }
    }
    return "";
  }

  shuffleArray(artists);

  return (
    <div>
      <h1>Compare</h1>
      <h3>Who has more plays?</h3>
      <div className='flexContainer'>
        <div className="homeItems">
          <h2 className='titleText'>{setArtist1String(artists)}</h2>
          <ul className="infoList">
            {artists.slice(0, 1).map((artist, index) => (
              <li key={index}>
                <div>
                  <img src={artist?.Image} width="220" height="220" alt={artist?.Name} />
                  <div>
                    <h3>{setArtist1TopSong(artists)} </h3>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="homeItems">
          <h2 className='titleText'>{setArtist2String(artists)}</h2>
          <ul className="infoList">
            {artists.slice(1, 2).map((artist, index) => (
              <li key={index}>
                <div>
                  <img src={artist?.Image} width="220" height="220" alt={artist?.Name} />
                  <div>
                    <h3>{setArtist2TopSong(artists)}</h3>
                  </div>
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