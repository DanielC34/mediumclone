const mongoose = require("mongoose");

// Define the schema for the User model
let UserSchema = new mongoose.Schema({
  // Name of the user
  name: String,
  // Email of the user
  email: String,
  // Provider (e.g., Google, Facebook)
  provider: String,
  // Provider ID (unique identifier from the provider)
  provider_id: String,
  // Token associated with the user (for authentication)
  token: String,
  // URL of the user's profile picture
  provider_pic: String,
  // Array of user IDs that the user is following
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  // Array of user IDs that are following the user
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// Method to follow another user
UserSchema.methods.follow = function (userIdToFollow) {
  // Check if the user is already following the specified user
  if (this.following.indexOf(userIdToFollow) === -1) {
    // If not, add the user to the list of followed users
    this.following.push(userIdToFollow);
  }
  // Save and return the updated user
  return this.save();
};

// Method to add a follower to the user
UserSchema.methods.addFollower = function (followerId) {
  // Add the follower to the list of followers
  this.followers.push(followerId);
  // Note: We don't return this.save() here because we're not modifying the user's own information.
};

// Export the User model with the defined schema
module.exports = mongoose.model("User", UserSchema);
