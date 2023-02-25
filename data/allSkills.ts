import {
  AlpineIcon,
  EsBuildIcon,
  FaunaIcon,
  FireshipIcon,
  NetlifyIcon,
  PreactIcon,
  ShopifyIcon,
  SpotifyIcon,
  TailwindIcon,
  TypeScriptIcon,
  UserbackIcon,
} from 'icons';
import { HeroIcon, NoSymbolSolid } from '@heroicons';

export const allSkills: AllSkills = {
  alpine: {
    Icon: AlpineIcon,
    name: 'Alpine',
    type: 'frontend',
  },
  esbuild: {
    Icon: EsBuildIcon,
    name: 'esbuild',
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
  fireship: {
    Icon: FireshipIcon,
    name: 'Fireship.io',
    type: 'other',
  },
  userback: {
    Icon: UserbackIcon,
    name: 'Userback',
    type: 'other',
  },
};

export const fallbackSkill = (name: string): Skill => ({
  Icon: NoSymbolSolid,
  name,
  type: 'other',
});

export const getSkills = (skills: string[]): Skill[] => {
  return skills.map((skill) => allSkills[skill] ?? fallbackSkill(skill));
};

export type Skill = {
  // deno-lint-ignore no-explicit-any
  Icon: ((props: any) => JSX.Element) | HeroIcon;
  name: string;
  type: 'frontend' | 'backend' | 'other';
};

type AllSkills = {
  [key: string]: Skill;
};
