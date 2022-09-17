const pages = [
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Packages', href: '#packages' },
  { name: 'Contributions', href: '#contributions' },
];
export const Navigation = () => {
  return (
    <nav
      class="fixed bottom-6 z-20 flex w-full justify-center md:bottom-auto md:top-2"
      aria-label="Breadcrumb">
      <ol
        role="list"
        class="flex gap-2 rounded-md bg-gray-50 px-6 shadow dark:bg-gray-800 ">
        {pages.map((page) => (
          <li key={page.name} class="flex">
            <div class="flex items-center">
              <a
                href={page.href}
                class="px-2 py-4 text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
                aria-current={undefined}>
                {page.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};
