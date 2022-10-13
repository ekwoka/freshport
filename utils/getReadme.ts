export const getReadme = async (repo: string) => {
  const readme = await Promise.any(
    branches
      .map((branch) =>
        readmeNames.map((name) => fetchReadme(repo, branch, name))
      )
      .flat()
  );
  return readme;
};

const fetchReadme = async (repo: string, branch: string, name: string) => {
  const url = `https://raw.githubusercontent.com/${repo}/${branch}/${name}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Not Found');
  return response.text();
};

const branches = ['main', 'master'];

const readmeNames = ['README.md', 'readme.md'];
