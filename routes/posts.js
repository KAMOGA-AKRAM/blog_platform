const express = require('express');
const router = express.Router();
const db = require('../my_db/db_connection');

// GET: Retrieve all posts
router.get('/posts', (req, res) => {
  db.query('SELECT * FROM posts', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// POST: Insert a new post
router.post('/posts', (req, res) => {
  const { title, content, author } = req.body;
  const query = 'INSERT INTO posts (title, content, author) VALUES (?, ?, ?)';
  db.query(query, [title, content, author], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(`Post added with ID: ${result.insertId}`);
  });
});

// PUT: Update an existing post
router.put('/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;
  const query = 'UPDATE posts SET title = ?, content = ?, author = ? WHERE id = ?';
  db.query(query, [title, content, author, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(`Post with ID: ${id} updated`);
  });
});

// DELETE: Remove a post
router.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM posts WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(`Post with ID: ${id} deleted`);
  });
});

module.exports = router;
