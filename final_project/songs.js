function createSongDivs(data) {
    const songList = document.getElementById("SongList");
    data.forEach((song) => {
        const songDiv = document.createElement("div");
        songDiv.className = "album";

        // Create HTML structure for the song
        console.log(song.Image)
        songDiv.innerHTML = `
          <h2>${song.Name}</h2>
          <img src = "${song.Image}">
          <p>Duration: ${song.Duration}</p>
          <p>Plays: ${song.Plays}</p>
          <p>Album: ${song.Album}</p>
          <p>Artist: ${song.Artist}</p>
          `;

        // Append the song div to the songList div
        songList.appendChild(songDiv);
    });
}

// Read data from data.json
fetch('data.json')
    .then((response) => response.json())
    .then((data) => {
        createSongDivs(data.Songs);
    })
    .catch((error) => console.error('Error reading JSON data:', error));  