// Function to create divs for albums
function createAlbumDivs(data) {
    const albumList = document.getElementById("AlbumList");
  
    data.forEach((album) => {
      const albumDiv = document.createElement("div");
      albumDiv.className = "album";
  
      // Create HTML structure for the album
      console.log(album.Image)
      albumDiv.innerHTML = `
        <h2>${album.Name}</h2>
        <img src = "${album.Image}">
        <p>Singer: ${album.Singer}</p>
        <p>Date: ${album.Date}</p>
        <p>Songs:</p>
        `;
    
        // Create an unordered list for songs
        const songList = document.createElement("ul");
    
        album.Songs.forEach((song) => {
          const songItem = document.createElement("li");
          songItem.textContent = song;
          songList.appendChild(songItem);
        });
    
        albumDiv.appendChild(songList);
    
        // Append the album div to the AlbumList div
        albumList.appendChild(albumDiv);
    });
  }
  
  // Read data from data.json
  fetch('data.json')
    .then((response) => response.json())
    .then((data) => {
      createAlbumDivs(data.Albums);
    })
    .catch((error) => console.error('Error reading JSON data:', error));  