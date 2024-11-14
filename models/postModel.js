const db = require('../my_db/db_connection'); // Import the database connection

const Post = {
  // Method to create a new post in the database
  create: (postData, callback) => {
    const { title, content, author, publishedDate } = postData;
    const query = 'INSERT INTO posts (title, content, author, publishedDate) VALUES (?, ?, ?, ?)';
    
    db.query(query, [title, content, author, publishedDate], (err, result) => {
      if (err) {
        return callback(err, null); // Return the error to the service
      }
      callback(null, result); // Return the result (inserted post ID)
    });
  },

  // Method to retrieve all posts from the database
  getAll: (callback) => {
    const query = 'SELECT * FROM posts';
    
    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null); // Return the error to the service
      }
      callback(null, results); // Return the posts
    });
  },

  // Method to retrieve a post by its ID
  getById: (id, callback) => {
    const query = 'SELECT * FROM posts WHERE id = ?';
    
    db.query(query, [id], (err, result) => {
      if (err) {
        return callback(err, null); // Return the error to the service
      }
      callback(null, result); // Return the post by ID
    });
  },

  // Method to update a post by its ID
  update: (id, postData, callback) => {
    const { title, content, author, publishedDate } = postData;
    const query = 'UPDATE posts SET title = ?, content = ?, author = ?, publishedDate = ? WHERE id = ?';
    
    db.query(query, [title, content, author, publishedDate, id], (err, result) => {
      if (err) {
        return callback(err, null); // Return the error to the service
      }
      callback(null, result); // Return the result (updated post)
    });
  },

  // Method to delete a post by its ID
  delete: (id, callback) => {
    const query = 'DELETE FROM posts WHERE id = ?';
    
    db.query(query, [id], (err, result) => {
      if (err) {
        return callback(err, null); // Return the error to the service
      }
      callback(null, result); // Return the result (deleted post)
    });
  }
};

module.exports = Post;
