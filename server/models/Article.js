const mongoose = require("mongoose");

// Define the schema for the Article model
let ArticleSchema = new mongoose.Schema({
  // Text content of the article
  text: String,
  // Title of the article
  title: String,
  // Description of the article
  description: String,
  // URL of the featured image for the article
  feature_img: String,
  // Number of claps (likes) for the article
  claps: Number,
  // Reference to the author of the article (User model)
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // Array of comments associated with the article
  comments: [
    {
      // Reference to the author of the comment (User model)
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      // Text content of the comment
      text: String,
    },
  ],
});

// Method to increment the claps count of the article
ArticleSchema.methods.clap = function () {
  this.claps++;
  return this.save();
};

// Method to add a new comment to the article
ArticleSchema.methods.comment = function (comment) {
  this.comments.push(comment);
  return this.save();
};

// Method to associate an author (user) with the article
ArticleSchema.methods.addAuthor = function (authorId) {
  this.author = authorId;
  return this.save();
};

// Method to retrieve articles by a specific user ID
ArticleSchema.methods.getUserArticle = function (userId) {
  // Use 'this' instead of 'Article' to reference the model
  return this.model("Article").find({ author: userId }).exec();
};


// Export the Article model with the defined schema
module.exports = mongoose.model("Article", ArticleSchema);
