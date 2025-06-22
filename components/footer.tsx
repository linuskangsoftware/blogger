export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <div className="container mx-auto px-6 py-16 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="font-semibold text-black dark:text-white">Linus's Blog</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-md">
              A blog on my latest thoughts on web development, engineering design, and everything in between.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-black dark:text-white mb-4">Blogger</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/linuskangsoftware/blogger"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  Github Source
                </a>
              </li>
              <li>
                <a
                  href="https://linus.id.au/bd"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  Blogger Docs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-black dark:text-white mb-4">Socials</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@linus.id.au"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href="https://l.linus.id.au"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  Linktree
                </a>
              </li>
              <li>
                <a
                  href="https://linus.id.au/gh"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  Github
                </a>
              </li>
              <li>
                <a
                  href="https://linus.id.au/ds"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-12">
          <p className="text-gray-500 dark:text-gray-500 text-sm">© 2025 Linus's Blog. This site is powered by <strong>Blogger</strong>.</p>
        </div>
      </div>
    </footer>
  )
}