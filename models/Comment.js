const { Schema, model } = require('mongoose');

// these are the objects created with each comment
const CommentSchema = new Schema({
  writtenBy: {
    type: String
  },
  commentBody: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// create the Comment model using CommentSchema
const Comment = model('Comment', CommentSchema);

// export the Comment model
module.exports = Comment;