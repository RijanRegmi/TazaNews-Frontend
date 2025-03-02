import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./../Style/About.css";
import "./../Style/Profile.css";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";

function Profile() {
  const navigate = useNavigate();
  const [image, setImage] = useState("https://via.placeholder.com/150");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); // Track the selected file

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId"); // Get the userId from localStorage

        if (!token || !userId) {
          navigate("/login"); // Redirect if no token or userId
          return;
        }

        const response = await fetch(`http://localhost:5000/profile/get-profile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setName(data.user.name || "");
          setEmail(data.user.email || "");
          setPhone(data.user.phone || "");
          setImage(data.user.profilePic || "https://via.placeholder.com/150");
        } else {
          console.error("Failed to load profile:", data.error);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file); // Store the selected file
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Display image preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId"); // Get userId from localStorage

    if (!token || !userId) {
      alert("You must be logged in to update your profile.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);

    // Append selected file (image) if it exists
    if (selectedFile) {
      formData.append("image", selectedFile); // Append the file itself, not base64
    }

    try {
      const response = await fetch(`http://localhost:5000/profile/update/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // Token is passed in header
        },
        body: formData, // Send FormData with file
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
      <Header />
      <div className="profile-container">
        <div className="profile-left">
          <label htmlFor="file-input">
            <img src={image} alt="Profile" className="profile-image" />
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }} // Hide default file input
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
      <Footer />
    </>
  );
}

export default Profile;
