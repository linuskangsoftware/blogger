const express = require("express");
const { getPosts, getPost, getNumberOfPosts } = require("../utils/posts");
const { marked } = require("marked");
const path = require("path");
const router = express.Router();
const config = require("../../configuration.json");
router.get("/post/:slug", (req, res) => {
    const post = getPost(req.params.slug);
    console.log(post);  // Log the post to inspect the data

    if (!post) {
        console.log(`Post not found for slug: ${req.params.slug}`);
        return res.status(404).send("Post not found");
    }

    res.render("post", {
        title: post.title || "Untitled",  // Default value if title is missing
        author: post.author || "Unknown",  // Default value if author is missing
        date: post.date || "No date",  // Default value if date is missing
        tags: post.tags || [],  // Default empty array if tags are missing
        content: marked(post.content),  // Use marked to render Markdown to HTML
        coverImage: post.coverImage || null,  // Ensure coverImage is passed
        badge: post.badge || "wow",  // Ensure badge is passed
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