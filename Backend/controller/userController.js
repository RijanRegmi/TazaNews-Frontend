
const User = require("../Model/User"); // Correct path based on your structure
const { Op } = require("sequelize");

exports.updateUser = async (req, res) => {
  try {
    const { name, email, phone, profile_picture } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if new phone number already exists for another user
    if (phone) {
      const existingUser = await User.findOne({ where: { phone, id: { [Op.ne]: user.id } } });
      if (existingUser) return res.status(400).json({ message: "Phone number already in use" });
    }

    await user.update({ name, email, phone, profile_picture });
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};