const express = require('express');
const router = express.Router();
const config = require('../../configuration.json');
const { getPosts, getPost, getNumberOfPosts } = require("../utils/posts");
const { marked } = require("marked");

router.get('/name', (req, res) => {
    res.json({ name: config.blog.blog_name });
});

router.get('/description', (req, res) => {
    res.json({ desc: config.blog['about-card'].description });
});

router.get('/owner', (req, res) => {
    res.json({ name: config.blog.owner });
});

router.get("/recent-posts", (req, res) => {
    const posts = getNumberOfPosts(4);
    res.json(posts);
});

router.get("/all-posts", (req, res) => {
    const posts = getPosts();
    res.json(posts);
});

router.get("/post/:slug", (req, res) => {
    const post = getPost(req.params.slug);
    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }

    res.json({
        slug: req.params.slug,
        title: post.title || "Untitled",
        author: post.author || "Unknown",
        date: post.date || "No date",
        tags: post.tags || [],
        coverImage: post.coverImage || null,
        badge: post.badge || "wow",
        content: marked(post.content),
        rawContent: post.content
    });
});

module.exports = router;