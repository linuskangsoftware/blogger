---
outline: deep
title: Getting Started with Blogger
---

# Getting Started

The setup process for Blogger is very simple, just run a couple commands and get started blogging!

## Quick start

Run the following to get a development instance running.

```bash
git clone https://github.com/linuskangsoftware/blogger
cd blogger

# Run the installer and follow instructions
sudo bash setup.sh
```

After, you can run Blogger using ``npm``.

```bash
npm run dev
```

Now, you can head to the **admin panel** at ``http://localhost:3000/admin`` to create and manage your blog posts, as well as configuring additional settings.

## Custom Setup

::: tip

If your wanting a custom setup for Blogger, below is the tutorial on how to manually install dependencies and configuring Blogger.

:::

First, you'll need the following packages installed. Debian or Ubuntu is the preferred OS for future updates:

- ``NodeJS (v22+)``
- ``npm (v11.4.1+)``
- ``MariaDB/mysql-server``

Install them like so:

```bash
sudo apt update
sudo apt upgrade -y

sudo apt install -y nodejs npm mariadb
```

Next, clone the Blogger repository (ideally v2.0.0 LTS) and install the dependencies:

```bash
git clone https://github.com/linuskangsoftware/blogger
cd blogger
npm install --force
```

Copy and edit the ``.env``:

```bash
cp .env.example .env.local
```

Make sure to change the ``.env`` values to your own!

Now, create the required directories for blog posts/assets:

```bash
mkdir posts
mkdir public
```

And your done! You can run the development instance using ``npm``:

```bash
npm run dev
```

Now, you can head to the **admin panel** at ``http://localhost:3000/admin`` to create and manage your blog posts, as well as configuring additional settings.

::: tip Note

For custom installations, if your seeking custom components, check out the [API Reference](/utils/apis) for the Blogger APIs.

:::