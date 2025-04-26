const express = require("express");
const path = require("path");
const router = express.Router();

router.get('/profile_picture', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'blog_image_assets', 'profile_picture.png'));
});

router.get('/post/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'styles', 'post.css'));
});

router.get('/home/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'styles', 'home.css'));
});

router.get('/posts/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'styles', 'posts.css'));
});

router.get('/admin/server.log', (req, res) => {
    const rootPassword = req.query.rootpassword;
    if (rootPassword !== 'linuskang') {
      return res.status(403).send('403 Forbidden: Access Denied');
    }
    res.sendFile(path.join(__dirname, '..', '..', 'server.log'));
});

module.exports = router;