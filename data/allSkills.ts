import { h } from 'preact';

import {
  AlpineIcon,
  EsBuildIcon,
  FaunaIcon,
  NetlifyIcon,
  PreactIcon,
  ShopifyIcon,
  SpotifyIcon,
  TailwindIcon,
  TypeScriptIcon,
} from 'icons';
import { BanIcon } from 'heroicons';

export const allSkills: AllSkills = {
  alpine: {
    Icon: AlpineIcon,
    name: 'Alpine',
    type: 'frontend',
  },
  esbuild: {
    Icon: EsBuildIcon,
    name: 'esBuild',
    type: 'other',
  },
  fauna: {
    Icon: FaunaIcon,
    name: 'FaunaDB',
    type: 'backend',
  },
  netlify: {
    Icon: NetlifyIcon,
    name: 'Netlify Functions',
    type: 'backend',
  },
  preact: {
    Icon: PreactIcon,
    name: 'Preact/React',
    type: 'frontend',
  },
  shopify: {
    Icon: ShopifyIcon,
    name: 'Shopify Liquid',
    type: 'other',
  },
  spotify: {
    Icon: SpotifyIcon,
    name: 'Spotify Web SDK',
    type: 'other',
  },
  tailwind: {
    Icon: TailwindIcon,
    name: 'Tailwind CSS',
    type: 'frontend',
  },
  typescript: {
    Icon: TypeScriptIcon,
    name: 'TypeScript',
    type: 'other',
  },
};

const fallbackSkill = (name: string): Skill => ({
  Icon: BanIcon,
  name,
  type: 'other',
});

export const getSkills = (skills: string[]): Skill[] => {
  return skills.map((skill) => allSkills[skill] ?? fallbackSkill(skill));
};

export type Skill = {
  // deno-lint-ignore no-explicit-any
  Icon: (props: any) => h.JSX.Element;
  name: string;
  type: 'frontend' | 'backend' | 'other';
};

type AllSkills = {
  [key: string]: Skill;
};
