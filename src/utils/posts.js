const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const removeMd = require("remove-markdown");
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
            const plainText = removeMd(content).replace(/\n/g, " ");
            const preview = plainText.slice(0, 250).trim() + "...";
            return { ...data, slug: file.replace(".md", ""), preview };
        })

        .sort((a, b) => new Date(b.date) - new Date(a.date));
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
            const plainText = removeMd(content).replace(/\n/g, " ");
            const preview = plainText.slice(0, 300).trim() + "...";
            return { ...data, slug: file.replace(".md", ""), preview };
        })
        .filter(post => post.date)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

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