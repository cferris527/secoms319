import React, { useEffect, useState } from 'react';
const serverURL = "http://localhost:3080";
const Home = () => {
  const [artists, setArtists] = useState([]);
  const [search, setSearch] = useState('');
  const [idDelete, setIdDelete] = useState('');

  // New artist info to be added
  const [addNewArtist, setAddNewArtist] = useState({
    Name: "",
    Born: "",
    Image: "",
    Hometown: "",
    FunFact: "",
    Album: "",
    Songs: []
  });

  const handleIdChange = (e) => {
    setIdDelete(e.target.value);
  };
  const [updateArtist, setUpdateArtist] = useState({
    Name: '',
    FunFact: ''
  });
  
  // Function to handle changes in the input fields
  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateArtist({
      ...updateArtist,
      [name]: value
    });
  };
  
  // Function to trigger the update
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const { Name, FunFact } = updateArtist;
    updateArtistFunFact(Name, FunFact);
    // Optionally, you might want to clear the form fields after submission
    setUpdateArtist({
      Name: '',
      FunFact: ''
    });
  };

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
    fetch(serverURL + "/artists", {
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
          alert("Complete!");
        }
      });
  }

  function updateArtistFunFact(artistName, newFunFact) {
    fetch(`${serverURL}/artists/${artistName}/funfact`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newFunFact }), // Send the new fun fact in the request body
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to update artist's fun fact");
      }
      return response.json(); // Parse JSON response
    })
    .then((data) => {
      console.log("Update artist's fun fact completed for:", artistName);
      console.log(data);
      // Assuming the server responds with the updated artist details
      // You can handle the response data accordingly
    })
    .catch((error) => {
      console.error("Error updating artist's fun fact:", error);
      // Handle error here if needed
    });
  }

  // Delete Artist by ID
  function deleteOneProduct(e) {
    e.preventDefault(); // Prevent form submission and page refresh
    console.log("Artist to delete:", idDelete);
    fetch(`${serverURL}/artists/${idDelete}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete artist");
      }
      return response.json(); // Parse JSON response
    })
    .then((data) => {
      console.log("Delete an artist completed:", idDelete);
      console.log(data);
      // Assuming the server responds with { "message": "Artist deleted successfully" }
      alert("Complete!"); // Show the response message
    })
    .catch((error) => {
      console.error("Error deleting artist:", error);
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

        <form className="formContainer" onSubmit={deleteOneProduct}>
          <input
            className="inputField"
            type="text"
            placeholder="Name?"
            value={idDelete}
            onChange={handleIdChange}
          />
          <button className="submitButton" type="submit">
            Delete Artist
          </button>
        </form>

        <form className="formContainer" onSubmit={handleUpdateSubmit}>
          <input
            className="inputField"
            type="text"
            placeholder="Name?"
            name="Name"
            value={updateArtist.Name}
            onChange={handleUpdateChange}
          />
          <input
            className="inputField"
            type="text"
            placeholder="FunFact?"
            name="FunFact"
            value={updateArtist.FunFact}
            onChange={handleUpdateChange}
          />
          <button className="submitButton" type="submit">
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