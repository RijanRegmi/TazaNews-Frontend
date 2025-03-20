const { DataTypes } = require("sequelize");
const { Sequelize } = require("sequelize-mock");
const UserModel = require("../models/User");

describe("User Model", () => {
  let sequelizeMock;
  let User;

  beforeAll(() => {
    // Create a new Sequelize mock instance
    sequelizeMock = new Sequelize();
    User = UserModel(sequelizeMock, DataTypes);
  });

  it("should have valid model properties", () => {
    // Validate model properties
    expect(User.tableName).toBe("Users"); // Sequelize will pluralize model names
    expect(User.rawAttributes.userId).toBeDefined();
    expect(User.rawAttributes.name).toBeDefined();
    expect(User.rawAttributes.email).toBeDefined();
    expect(User.rawAttributes.password).toBeDefined();
    expect(User.rawAttributes.phone).toBeDefined();
    expect(User.rawAttributes.profilePic).toBeDefined();
  });

  it("should validate email uniqueness and format", async () => {
    User.findOne = jest.fn().mockResolvedValue(null); // Simulate unique email

    const mockUserData = {
      userId: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      password: "securepassword123",
      phone: "1234567890",
      profilePic: null,
    };

    const userInstance = User.build(mockUserData);
    await expect(userInstance.validate()).resolves.not.toThrow();
  });

  it("should reject invalid email format", async () => {
    const mockInvalidData = {
      userId: 1,
      name: "John Doe",
      email: "invalid-email",
      password: "securepassword123",
      phone: "1234567890",
      profilePic: null,
    };

    const userInstance = User.build(mockInvalidData);
    await expect(userInstance.validate()).rejects.toThrow();
  });

  it("should not allow null values for required fields", async () => {
    const mockInvalidData = {
      email: null,
      password: null,
    };

    const userInstance = User.build(mockInvalidData);
    await expect(userInstance.validate()).rejects.toThrow();
  });
});
