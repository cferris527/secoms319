import React, { useEffect, useState } from 'react';
const serverURL = "http://localhost:3080";
const Home = () => {
  const [albums, setAlbums] = useState([]);
  const [search, setSearch] = useState('');
  const [id_delete, set_id_delete] = useState('');

  // New album info to be added
  const [addNewAlbum, setAddNewAlbum] = useState({
    Name: "",
    Singer: "",
    Image: "http://127.0.0.1:4000/images/",
    Date: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const albumsResponse = await fetch(serverURL + '/albums');
        const albumsData = await albumsResponse.json();
        setAlbums(albumsData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  function handleChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "Name") {
      setAddNewAlbum({ ...addNewAlbum, Name: value });
    }
    else if (evt.target.name === "Image") {
      setAddNewAlbum({ ...addNewAlbum, Image: value });
    }
    else if (evt.target.name === "Singer") {
      setAddNewAlbum({ ...addNewAlbum, Singer: value });
    }
    else if (evt.target.name === "Date") {
      setAddNewAlbum({ ...addNewAlbum, Date: value });
    }
  }

  // Send new Album to Database
  // Currently not working,"TypeError : Failed to fetch ..."
  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://127.0.0.1:4000/albums", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewAlbum),
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

  // Delete Album by ID
  function deleteOneProduct(deleteid) {
    console.log("Album to delete :", deleteid);
    fetch(`http://127.0.0.1:4000/api/albums/:${deleteid}`, { // Include deleteid in the URL
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
      <h1>Albums</h1>

      <input className='searchBar'
        type="text"
        placeholder="Search Artists"
        onChange={(e) => setSearch(e.target.value)}
      />

      <h3>Add Album, Delete Album, Update Existing Album</h3>
      <div className="grid-container">
        <form className="formContainer" action="">
          <input className="inputField" type="text" placeholder="Name?" name="Name" value={addNewAlbum.Name}
            onChange={handleChange} />
          <input className="inputField" type="text" placeholder="Singer?" name="Singer" value={addNewAlbum.Singer}
            onChange={handleChange} />
          <input className="inputField" type="text" placeholder="Image?" name="Image" value={addNewAlbum.Image}
            onChange={handleChange} />
          <input className="inputField" type="text" placeholder="Date?" name="Date" value={addNewAlbum.Date}
            onChange={handleChange} />
          <button className="submitButton" type="submit" onClick={handleOnSubmit}>
            Submit New Album
          </button>
        </form>

        <form className="formContainer" action="">
          <input className="inputField" type="text" placeholder="ID?" name="Id"
            onChange={(e) => set_id_delete(e)} />
          <button className="submitButton" type="submit" onClick={deleteOneProduct}>
            Delete Album
          </button>
        </form>

        <form className="formContainer" action="">
          <input className="inputField" type="text" placeholder="Name?" name="Name" value={addNewAlbum.Name}
            onChange={handleChange} />
          <input className="inputField" type="text" placeholder="Singer?" name="Singer" value={addNewAlbum.Singer}
            onChange={handleChange} />
          <input className="inputField" type="text" placeholder="Image?" name="Image" value={addNewAlbum.Image}
            onChange={handleChange} />
          <input className="inputField" type="text" placeholder="Date?" name="Date" value={addNewAlbum.Date}
            onChange={handleChange} />
          <button className="submitButton" type="submit" onClick={handleOnSubmit}>
            Update Album Info
          </button>
        </form>

      </div>

      <div className="grid-container">
        {albums.filter((album) =>
          album.Name.toLowerCase().includes(search.toLowerCase())
        )

          .map((album, index) => (
            <div className="grid-item">
              <img src={album.Image} width="150" height="150" alt={album.Name} />
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