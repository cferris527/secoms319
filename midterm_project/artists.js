console.log("TEST")

function setArtist(artistName, position) {
  // Replace with the actual path to your JSON file
  const jsonFilePath = 'data.json';
  const imageFolderPath = '/images/artists/'; 

  // Fetch the JSON file
  fetch(jsonFilePath)
  .then(response => response.json())
  .then(data => {
    const artistData = data.Artists.find(artist => artist.hasOwnProperty(artistName));
    if (artistData) {
      const artistInfo = artistData[artistName];
      const imgElement = document.getElementById("artistImage" + position.toString()); // Replace "artistImage" with your actual img tag's id
      const pBorn = document.getElementById("born" + position.toString());
      const pHome = document.getElementById("hometown" + position.toString());
      const pFunFact = document.getElementById("fun-fact" + position.toString());
      const pAlbumName = document.getElementById("album-name" + position.toString());
      const pSong1 = document.getElementById("song" + position.toString() + "1");
      const pSong2 = document.getElementById("song" + position.toString() + "2");

      // set each HTML = the JSON DATA
      imgElement.src = artistInfo.Image;
      pBorn.innerHTML = pBorn.innerHTML + "&nbsp;" + artistInfo.Born;
      pHome.innerHTML = pHome.innerHTML + "&nbsp;" + artistInfo.Hometown;
      pFunFact.innerHTML = pFunFact.innerHTML + "&nbsp;" + artistInfo.FunFact;
      pAlbumName.innerHTML = pAlbumName.innerHTML + "&nbsp;" + artistInfo.Album;
      pSong1.innerHTML = artistInfo.Songs[0];
      pSong2.innerHTML = artistInfo.Songs[1];
    } else {
      console.error("Artist not found in the JSON data.");
    }
  })
  .catch(error => {
    console.error("Error loading the JSON file:", error);
  });
}

function setAllArtists(){
  const artists = ["Billie", "Drake", "Nicki Manaj", "Ariana Grande", "Eminem", "The weekend"]
  for(let i = 0; i < artists.length; i++) {
    setArtist(artists[i], i)
  }
}

setAllArtists()
