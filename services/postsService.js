const Post = require('../models/postModel'); // Import the Post model

const PostService = {
  // Service to create a new post
  createPost: (postData, callback) => {
    // Validate input data (simple validation example)
    if (!postData.title || !postData.content || !postData.author || !postData.publishedDate) {
      return callback('All fields are required.', null); // Return error if any field is missing
    }

    // Call the Post model to insert data
    Post.create(postData, (err, result) => {
      if (err) {
        return callback(err, null); // Return error if insertion fails
      }
      callback(null, result); // Return the inserted post ID or result
    });
  },

  // Service to retrieve all posts
  getAllPosts: (callback) => {
    Post.getAll((err, posts) => {
      if (err) {
        return callback(err, null); // Return error if retrieval fails
      }
      callback(null, posts); // Return the list of posts
    });
  },

  // Service to get a post by its ID
  getPostById: (id, callback) => {
    if (!id) {
      return callback('Post ID is required.', null); // Check if ID is provided
    }

    Post.getById(id, (err, post) => {
      if (err) {
        return callback(err, null); // Return error if post retrieval fails
      }
      if (post.length === 0) {
        return callback('Post not found.', null); // Return error if post is not found
      }
      callback(null, post); // Return the post by ID
    });
  },

  // Service to update a post
  updatePost: (id, postData, callback) => {
    if (!id || !postData) {
      return callback('Post ID and data are required.', null); // Validate ID and data
    }

    // Validate input data
    if (!postData.title || !postData.content || !postData.author || !postData.publishedDate) {
      return callback('All fields are required.', null);
    }

    Post.update(id, postData, (err, result) => {
      if (err) {
        return callback(err, null); // Return error if update fails
      }
      callback(null, result); // Return the updated post
    });
  },

  // Service to delete a post
  deletePost: (id, callback) => {
    if (!id) {
      return callback('Post ID is required.', null); // Validate ID
    }

    Post.delete(id, (err, result) => {
      if (err) {
        return callback(err, null); // Return error if deletion fails
      }
      if (result.affectedRows === 0) {
        return callback('Post not found or already deleted.', null); // Return error if no rows affected
      }
      callback(null, result); // Return the result of deletion
    });
  }
};

module.exports = PostService;
