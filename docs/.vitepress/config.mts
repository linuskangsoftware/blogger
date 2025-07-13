import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Blogger Docs",
  description: "The documentation site for all things Blogger.",
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/intro/getting-started' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/intro/getting-started' }
        ]
      },
      {
        text: 'Utilities',
        items: [
          { text: 'API Reference', link: '/utils/apis' },
          { text: 'Helper Functions', link: '/utils/helpers' },
        ]
      },
      {
        text: 'Miscellaneous',
        items: [
          { text: 'Contributing to Docs', link: '/misc/docs' },
          { text: 'Credits', link: '/misc/credits' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/linuskangsoftware/blogger' }
    ],

    editLink: {
      pattern: 'https://github.com/linuskangsoftware/blogger/edit/main/docs',
      text: 'Edit Page'
    },

    footer: {
      message: 'Blogger is an open-source project maintained by Linus Kang Software.',
      copyright: '© 2025 Linus Kang Software'
    },
  }
})