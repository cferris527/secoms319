import React, { useState } from 'react';

const UpdatePage = () => {
  const [postData, setPostData] = useState({
    id: '',
    title: '',
    price: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://127.0.0.1:4000/api/update/${postData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      console.log('Post updated successfully');
      // Handle success: Show a success message or redirect the user
    } catch (error) {
      console.error('Error updating post:', error);
      // Handle error: Show an error message to the user
    }
  };

  return (
    <div>
      <h1>Update Post</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Post ID:
          <input type="text" name="id" value={postData.id} onChange={handleChange} />
        </label>
        <label>
          Title:
          <input type="text" name="title" value={postData.title} onChange={handleChange} />
        </label>
        <label>
          Price:
          <input type="text" name="price" value={postData.price} onChange={handleChange} />
        </label>
        {/* Add similar input fields for other post properties */}
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default UpdatePage;
