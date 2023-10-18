console.log("TEST")

function setArtistImage(artistName) {
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
      const imgElement = document.getElementById("artistImage"); // Replace "artistImage" with your actual img tag's id
      if (imgElement) {
        imgElement.src = `${imageFolderPath}${artistName.toLowerCase()}.jpeg`;
      } else {
        console.error("Image element not found in the HTML.");
      }
    } else {
      console.error("Artist not found in the JSON data.");
    }
  })
  .catch(error => {
    console.error("Error loading the JSON file:", error);
  });
}

function setAllArtists(){
  const artists = ["Drake", "Billie"]
  for(let i = 0; i < artists.length; i++) {
    setArtistImage(artists[i])
  }
}

setAllArtists()
