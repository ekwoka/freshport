const pages = [
  { name: 'Skills', href: '/#skills' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Packages', href: '/packages' },
  { name: 'Contributions', href: '/#contributions' },
];

export const Navigation = () => {
  return (
    <nav
      class="fixed bottom-6 z-20 flex lg:flex-col w-full justify-center md:bottom-auto md:top-2 lg:left-8 lg:min-h-screen pointer-events-none"
      aria-label="Breadcrumb">
      <ol
        role="list"
        class="flex gap-2 rounded-md bg-gray-50 shadow dark:bg-gray-800 lg:flex-col lg:max-w-min overflow-hidden px-2 md:px-0 pointer-events-auto">
        {pages.map((page) => (
          <li key={page.name} class="flex items-center hover:bg-white hover:bg-opacity-10">
            <a
              href={page.href}
              class="px-2 md:px-8 py-4 text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 w-full"
              aria-current={undefined}>
              {page.name}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};
