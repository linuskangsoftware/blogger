const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const postsDir = path.join(__dirname, "../posts");

function getPosts() {
    if (!fs.existsSync(postsDir)) return [];
    const files = fs.readdirSync(postsDir);
    return files
    .filter(file => file.endsWith(".md"))
    .map(file => {
        const filePath = path.join(postsDir, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(fileContent);
        const preview = content.slice(0, 100) + "...";
        return { ...data, slug: file.replace(".md", ""), preview };
    });
}

function getNumberOfPosts(count = null) {
    if (!fs.existsSync(postsDir)) return [];
    const files = fs.readdirSync(postsDir);

    const posts = files
        .filter(file => file.endsWith(".md"))
        .map(file => {
            const filePath = path.join(postsDir, file);
            const fileContent = fs.readFileSync(filePath, "utf-8");
            const { data, content } = matter(fileContent);
            const preview = content.slice(0, 100) + "...";
            return { ...data, slug: file.replace(".md", ""), preview };
        })
        .filter(post => post.date) // Make sure posts have a date
        .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort newest first

    return count ? posts.slice(0, count) : posts;
}

function getPost(slug) {
    const filePath = path.join(postsDir, `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    // Return the parsed data, including coverImage and badge
    return { ...data, content };
}


module.exports = { getPosts, getPost, getNumberOfPosts };