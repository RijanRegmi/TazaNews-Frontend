const User = require("../Model/User");

exports.updateUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const image = req.file
      ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
      : null; // Construct image URL if an image is uploaded

    // Find the user by ID
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Prepare the updated data object
    const updatedData = {};

    if (name) updatedData.name = name;
    if (email) updatedData.email = email;
    if (phone) updatedData.phone = phone;
    if (image) updatedData.profilePic = image; // Update profilePic with the image URL if uploaded

    // Update the user
    await user.update(updatedData);

    // Respond with the updated user data
    res.status(200).json({
      message: "User updated successfully",
      user: {
        ...user.toJSON(), // Return the user data as a plain object
        profilePicUrl: image, // Return the image URL
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getUserProfile = async (req, res) => {
  try {
    // Find the user by primary key (ID)
    const user = await User.findByPk(req.params.id);
    
    // If the user is not found, return a 404 error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the user data as a response
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};