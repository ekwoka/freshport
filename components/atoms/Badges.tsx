import { JSX } from 'preact/jsx-runtime';

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
        const [name, url, ratio] = BADGES[badge];
        return (
          <img
            src={url.replace('{package}', pkg)}
            height="32"
            width={32 * ratio}
            alt={name}
            class="max-h-[2rem] w-auto"
          />
        );
      })}
    </div>
  );
};

export const BADGES: Record<BadgeType, [string, string, number]> = {
  version: [
    'NPM Version',
    'https://img.shields.io/npm/v/{package}?label=%20&style=for-the-badge&logo=pnpm&logoColor=white',
    88 / 28,
  ],
  types: [
    'NPM Type Definitions',
    'https://img.shields.io/npm/types/{package}?label=%20&logo=typescript&logoColor=white&style=for-the-badge',
    126.5 / 28,
  ],
  downloads: [
    'NPM Downloads',
    'https://img.shields.io/npm/dt/{package}?style=for-the-badge&logo=npm&logoColor=white',
    173 / 28,
  ],
  size: [
    'MINZIPPED Size',
    'https://img.shields.io/bundlephobia/minzip/{package}?style=for-the-badge&logo=esbuild&logoColor=white',
    208 / 28,
  ],
};

type BadgeType = 'version' | 'types' | 'downloads' | 'size';
