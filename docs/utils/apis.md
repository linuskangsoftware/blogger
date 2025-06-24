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

## Example Response

```json
{
  "version": "1.0.0",
  "name": "My Awesome Blog",
  "description": "A blog about tech and coding"
}
```

### Usage

```ts
const response = await fetch('/api')
const blogInfo = await response.json()
console.log(blogInfo.version, blogInfo.name, blogInfo.description)
```