import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import './../Style/About.css';
import './../Style/Profile.css';
import Footer from './Footer.jsx';
import Header from './Header.jsx';

function Profile() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Fetch profile data when component loads
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/profile");
        const data = await response.json();
        if (response.ok) {
          setName(data.name || "");
          setEmail(data.email || "");
          setPhone(data.phone || "");
          setImage(data.profile_picture || "https://via.placeholder.com/150");
        } else {
          console.error("Failed to load profile:", data.error);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []); // Runs only once when the component loads

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    const profileData = { name, email, phone, profile_picture: image };
  
    try {
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <>
      <Header/>
      <div className="profile-container">
        <div className="profile-left">
          <label htmlFor="file-input">
            <img
              src={image}
              alt="Profile"
              className="profile-image"
            />
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        <div className="profile-right">
          <h3>My Profile</h3>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Enter Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button className="save-btn" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Profile;
