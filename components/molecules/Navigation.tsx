const pages = [
  { name: 'Skills', href: '/#skills' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Packages', href: '/#packages' },
  { name: 'Contributions', href: '/#contributions' },
];

export const Navigation = () => {
  return (
    <nav
      class="pointer-events-none fixed bottom-6 z-20 flex w-full justify-center md:bottom-auto md:top-2 lg:left-8 lg:min-h-screen lg:flex-col"
      aria-label="Breadcrumb">
      <ol
        role="list"
        class="pointer-events-auto flex gap-2 overflow-hidden rounded-md bg-gray-50 px-2 shadow dark:bg-gray-800 md:px-0 lg:max-w-min lg:flex-col">
        {pages.map((page) => (
          <li
            key={page.name}
            class="flex items-center hover:bg-white hover:bg-opacity-10">
            <a
              href={page.href}
              class="w-full px-2 py-4 text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 md:px-8"
              aria-current={undefined}>
              {page.name}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};
