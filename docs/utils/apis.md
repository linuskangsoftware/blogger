---
outline: deep
title: API Reference | Blogger Docs
---

# API Reference

This article lists all the available APIs that Blogger uses internally.

::: tip

The API reference only exposes endpoints that are used inside the internal Blogger functions for security. 

If you are seeking other functions, checkout Blogger's [Helper Functions](/utils/helpers) for a list of all the functions that you can implement.

:::

## `GET /api`

Returns a JSON response with the following fields:

| Field       | Type   | Description                |
| ----------- | ------ | --------------------------|
| `version`   | string | The current version of the blog (from `env.VERSION`) |
| `name`      | string | The blog's name (from `env.BLOG_NAME`)                |
| `description` | string | A short description of the blog (from `env.BLOG_DESCRIPTION`) |

### Usage

```ts
const response = await fetch('/api', {
  headers: {
    'Authorization': 'Bearer YOUR_API_TOKEN_HERE',
    'Content-Type': 'application/json',
  },
})

if (!response.ok) {
  throw new Error(`Error ${response.status}: ${response.statusText}`)
}

const blogInfo = await response.json()
console.log(blogInfo.version, blogInfo.name, blogInfo.description)
```