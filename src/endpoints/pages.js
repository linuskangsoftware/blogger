const express = require("express");
const { getPosts, getPost, getNumberOfPosts } = require("../utils/posts");
const { marked } = require("marked");
const path = require("path");
const router = express.Router();
const config = require("../../configuration.json");
router.get("/post/:slug", (req, res) => {
    const post = getPost(req.params.slug);
    console.log(post);

    if (!post) {
        console.log(`Post not found for slug: ${req.params.slug}`);
        return res.status(404).send("Post not found");
    }

    res.render("post", {
        title: post.title || "Untitled",
        author: post.author || "Unknown",
        date: post.date || "No date",
        tags: post.tags || [],
        content: marked(post.content),
        coverImage: post.coverImage || null,
        badge: post.badge || "wow",
    });
});


router.get("/", (req, res) => {
    const posts = getNumberOfPosts(4);
    res.render("home", { posts });
});

router.get("/blog/posts", (req, res) => {
    const posts = getPosts();
    res.render("posts", { posts });
});

router.get("/admin/logs", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'admin', 'logs.html'));
});

module.exports = router;