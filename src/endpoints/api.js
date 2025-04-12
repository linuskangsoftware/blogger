const express = require('express');
const router = express.Router();
const config = require('../../configuration.json');

router.get('/name', (req, res) => {
    res.json({ name: config.blog.blog_name });
});

module.exports = router;