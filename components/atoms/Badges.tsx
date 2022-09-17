import { JSX } from "preact/jsx-runtime";

export const Badges = ({
  package: pkg,
  badges,
}: {
  package: string;
  badges: Array<keyof typeof BADGES>;
}) => {
  return (
    <div class="flex flex-row flex-wrap items-center justify-center gap-4">
      {badges.map((badge) => {
        const [name, url] = BADGES[badge];
        return (
          <img
            src={url.replace('{package}', pkg)}
            alt={name}
            class="max-h-[2rem]"
          />
        );
      })}
    </div>
  );
};

export const BADGES = {
  version: [
    'NPM Version',
    'https://img.shields.io/npm/v/{package}?style=for-the-badge',
  ],
  types: [
    'NPM Type Definitions',
    'https://img.shields.io/npm/types/{package}?label=%20&logo=typescript&logoColor=white&style=for-the-badge',
  ],
  downloads: [
    'NPM Downloads',
    'https://img.shields.io/npm/dt/{package}?style=for-the-badge',
  ],
  size: [
    'MINZIPPED Size',
    'https://img.shields.io/bundlephobia/minzip/{package}?style=for-the-badge',
  ],
};
