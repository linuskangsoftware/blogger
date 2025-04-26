## Blogger: A Nodejs framework for creating blogging sites.
Blogger is a all-in-one nodejs framework for people who want a simple, sleek blogging site.

> [!WARNING]
> The following instructions below have been deprecated as of **26/04/2025**. Please visit https://to.linuskang.au/bloggerdocs for the updated instructions on how to set up Blogger.

### Getting Started: Build 104
To use Blogger, you will need the following installed:
``nodejs``
``npm``

1. To start using blogger, clone this repository using
```
git clone https://github.com/linuskangsoftware/linuskang-blog.git
```

2. Next, you will need to install all the libaries required using ``npm install``

3. You will need to create the following files/folders: ``blog_image_assets/``, and the ``posts`` directory inside ``/src``

Your new added files structure should look like this, with ``blog_image_assets/`` and ``posts/``:
```
blogger/
└── src/
    ├── views/
    |   └──blog_image_assets/
    └── posts/
```

5. You can start a development server by running this inside the terminal
```
npm run dev
```

6. Start writing your blog posts! You need to write them inside the ``/posts`` directory. Each post should consist of a ``.md`` file with the following structure:
```md
---
title: "First ever blog post"
author: "Linus Kang"
date: "2025-03-29"
tags: ["blogging", "markdown", "web"]
badge: "Featuring @system"
coverImage: "/blog_image_assets/29.03.2025-first-ever-blog-post.header.avif"
---

This is my first post! **Markdown works too.**
```

After writing the post, just save it! No need to restart the webserver since Blogger automatically updates with all blog posts!
