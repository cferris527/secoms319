import React, { useEffect, useState } from 'react';
const serverURL = "http://localhost:3080";
const Home = () => {
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState('');
  const [id_delete, set_id_delete] = useState('');

  // New song info to be added
  const [addNewSong, setAddNewSong] = useState({
    Name: "",
    Image: "http://127.0.0.1:4000/images/",
    Duration: "",
    Plays: "",
    Album: "",
    Artist: ""
  });

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

  function handleChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "Name") {
      setAddNewSong({ ...addNewSong, Name: value });
    }
    else if (evt.target.name === "Image") {
      setAddNewSong({ ...addNewSong, Image: value });
    }
    else if (evt.target.name === "Duration") {
      setAddNewSong({ ...addNewSong, Duration: value });
    }
    else if (evt.target.name === "Plays") {
      setAddNewSong({ ...addNewSong, Plays: value });
    }
    else if (evt.target.name === "Album") {
      setAddNewSong({ ...addNewSong, Album: value });
    }
    else if (evt.target.name === "Artist") {
      setAddNewSong({ ...addNewSong, Artist: value });
    }
  }

  // Send new Song to Database
  // Currently not working,"TypeError : Failed to fetch ..."
  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://127.0.0.1:4000/songs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewSong),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post a new artist completed");
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
  }

  // Delete Song by ID
  function deleteOneProduct(deleteid) {
    console.log("Song to delete :", deleteid);
    fetch(`http://127.0.0.1:4000/api/songs/:${deleteid}`, { // Include deleteid in the URL
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete product");
        }
        return response.json(); // Parse JSON response
      })
      .then((data) => {
        console.log("Delete a product completed : ", deleteid);
        console.log(data);
        // Assuming the server responds with { "message": "Post deleted successfully" }
        alert(data.message); // Show the response message
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        // Handle error here if needed
      });
  }

  return (
    <div>
      <h1>Songs</h1>

      <input className='searchBar'
        type="text"
        placeholder="Search Songs"
        onChange={(e) => setSearch(e.target.value)}
      />

      <h3>Add Song, Delete Song, Update Existing Song</h3>
      <div className="grid-container">
        <form className="formContainer" action="">
          <input className="inputField" type="text" placeholder="Name?" name="Name" value={addNewSong.Name}
            onChange={handleChange} />
          <input className="inputField" type="text" placeholder="Image?" name="Image" value={addNewSong.Image}
            onChange={handleChange} />
          <input className="inputField" type="text" placeholder="Duration?" name="Duration" value={addNewSong.Duration}
            onChange={handleChange} />
          <input className="inputField" type="text" placeholder="Plays?" name="Plays" value={addNewSong.Plays}
            onChange={handleChange} />
          <input className="inputField" type="text" placeholder="Album?" name="Album" value={addNewSong.Album}
            onChange={handleChange} />
          <input className="inputField" type="text" placeholder="Artist?" name="Artist" value={addNewSong.Artist}
            onChange={handleChange} />
          <button className="submitButton" type="submit" onClick={handleOnSubmit}>
            Submit New Song
          </button>
        </form>

        <form className="formContainer" action="">
          <input className="inputField" type="text" placeholder="ID?" name="Id"
            onChange={(e) => set_id_delete(e)} />
          <button className="submitButton" type="submit" onClick={deleteOneProduct}>
            Delete Song
          </button>
        </form>

        <form className="formContainer" action="">
          <input className="inputField" type="text" placeholder="Name?" name="Name" value={addNewSong.Name}
            onChange={handleChange} />
          <input className="inputField" type="text" placeholder="Image?" name="Image" value={addNewSong.Image}
            onChange={handleChange} />
          <input className="inputField" type="text" placeholder="Duration?" name="Duration" value={addNewSong.Duration}
            onChange={handleChange} />
          <input className="inputField" type="text" placeholder="Plays?" name="Plays" value={addNewSong.Plays}
            onChange={handleChange} />
          <input className="inputField" type="text" placeholder="Album?" name="Album" value={addNewSong.Album}
            onChange={handleChange} />
          <input className="inputField" type="text" placeholder="Artist?" name="Artist" value={addNewSong.Artist}
            onChange={handleChange} />
          <button className="submitButton" type="submit" onClick={handleOnSubmit}>
            Update Song Info
          </button>
        </form>

      </div>

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