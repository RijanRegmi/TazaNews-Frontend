import { useState } from "react";
import axios from "axios";
import './../Style/AdminNews.css';

const AdminNews = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", text);
    formData.append("image", image);

    try {
      const response = await axios.post("http://localhost:5000/news/add-news", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(response.data.message);
      setTitle("");
      setText("");
      setImage(null);
    } catch (error) {
      console.error("Error adding news:", error);
      setMessage("Failed to add news.");
    }
  };

  return (
    <div className="admin-container">
      <h2>Add News Article</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="News Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <button type="submit">Add News</button>
      </form>
    </div>
  );
};

export default AdminNews;
