import React, { useEffect, useState } from 'react';
const serverURL = "http://localhost:3080";
const Home = () => {
  const [artists, setArtists] = useState([]);
  const [search, setSearch] = useState('');
  const [id_delete, set_id_delete] = useState('');

  // New artist info to be added
  const [addNewArtist, setAddNewArtist] = useState({
    Name: "",
    Born: "",
    Image: "http://127.0.0.1:4000/images/",
    Hometown: "",
    FunFact: "",
    Album: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artistsResponse = await fetch(serverURL + '/artists');
        const artistsData = await artistsResponse.json();
        setArtists(artistsData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  function handleChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "Name") {
      setAddNewArtist({ ...addNewArtist, Name: value });
    }
    else if (evt.target.name === "Born") {
      setAddNewArtist({ ...addNewArtist, Born: value });
    }
    else if (evt.target.name === "Image") {
      setAddNewArtist({ ...addNewArtist, Image: value });
    }
    else if (evt.target.name === "Hometown") {
      setAddNewArtist({ ...addNewArtist, Hometown: value });
    }
    else if (evt.target.name === "FunFact") {
      setAddNewArtist({ ...addNewArtist, FunFact: value });
    }
    else if (evt.target.name === "Album") {
      setAddNewArtist({ ...addNewArtist, Album: value });
    }
  }

  // Send new Artist to Database
  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://127.0.0.1:4000/artists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewArtist),
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

  // Delete Artist by ID
  function deleteOneProduct(deleteid) {
    console.log("Artist to delete :", deleteid);
    fetch(`http://127.0.0.1:4000/api/artists/:${deleteid}`, { // Include deleteid in the URL
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
      <h1>Artists</h1>

      <input className='searchBar'
        type="text"
        placeholder="Search Artists"
        onChange={(e) => setSearch(e.target.value)}
      />

      <h3>Add Artist, Delete Artist, Update Existing Artist</h3>

      <div className="grid-container">
        <form className="formContainer" action="">
          <input className="inputField" type="text" placeholder="Name?" name="Name" value={addNewArtist.Name}
            onChange={handleChange} />
          <input className="inputField" type="text" placeholder="Born?" name="Born" value={addNewArtist.Born}
            onChange={handleChange} />
          <input className="inputField" type="text" placeholder="Image?" name="Image" value={addNewArtist.Image}
            onChange={handleChange} />
          <input className="inputField" type="text" placeholder="Hometown?" name="Hometown" value={addNewArtist.Hometown}
            onChange={handleChange} />
          <input className="inputField" type="text" placeholder="FunFact?" name="FunFact" value={addNewArtist.FunFact}
            onChange={handleChange} />
          <input className="inputField" type="text" placeholder="Album?" name="Album" value={addNewArtist.Album}
            onChange={handleChange} />
          <button className="submitButton" type="submit" onClick={handleOnSubmit}>
            Submit New Artist
          </button>
        </form>

        <form className="formContainer" action="">
          <input className="inputField" type="text" placeholder="ID?" name="Id"
            onChange={ (e) =>set_id_delete(e)} />
          <button className="submitButton" type="submit" onClick={deleteOneProduct}>
           Delete Artist
          </button>
        </form>

        <form className="formContainer" action="">
        <input className="inputField" type="text" placeholder="Name?" name="Name" value={addNewArtist.Name}
            onChange={handleChange} />
          <input className="inputField" type="text" placeholder="Born?" name="Born" value={addNewArtist.Born}
            onChange={handleChange} />
          <input className="inputField" type="text" placeholder="Image?" name="Image" value={addNewArtist.Image}
            onChange={handleChange} />
          <input className="inputField" type="text" placeholder="Hometown?" name="Hometown" value={addNewArtist.Hometown}
            onChange={handleChange} />
          <input className="inputField" type="text" placeholder="FunFact?" name="FunFact" value={addNewArtist.FunFact}
            onChange={handleChange} />
          <input className="inputField" type="text" placeholder="Album?" name="Album" value={addNewArtist.Album}
            onChange={handleChange} />
          <button className="submitButton" type="submit" onClick={handleOnSubmit}>
           Update Artist Info
          </button>
        </form>

      </div>

      <div className="grid-container">
        {artists.filter((artist) =>
          artist.Name.toLowerCase().includes(search.toLowerCase())
        )
          .map((artist, index) => (
            <div className="grid-item">
              <img src={artist.Image} width="150" height="150" alt={artist.Name} />
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