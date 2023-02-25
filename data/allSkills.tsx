import {
  AlpineIcon,
  EsBuildIcon,
  FaunaIcon,
  FireshipIcon,
  NetlifyIcon,
  PreactIcon,
  RustIcon,
  ShopifyIcon,
  SolidIcon,
  SpotifyIcon,
  TailwindIcon,
  TauriIcon,
  TypeScriptIcon,
  UserbackIcon,
  ViteIcon,
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
  fireship: {
    Icon: FireshipIcon,
    name: 'Fireship.io',
    type: 'other',
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
  rust: {
    Icon: RustIcon,
    name: 'Rust',
    type: 'backend',
  },
  shopify: {
    Icon: ShopifyIcon,
    name: 'Shopify Liquid',
    type: 'other',
  },
  solidjs: {
    Icon: SolidIcon,
    name: 'Solid.js',
    type: 'frontend',
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
  tauri: {
    Icon: TauriIcon,
    name: 'Tauri',
    type: 'backend',
  },
  typescript: {
    Icon: TypeScriptIcon,
    name: 'TypeScript',
    type: 'other',
  },
  userback: {
    Icon: UserbackIcon,
    name: 'Userback',
    type: 'frontend',
  },
  vite: {
    Icon: ViteIcon,
    name: 'Vite',
    type: 'other',
  },
};

export const fallbackSkill = (name: string): Skill => ({
  Icon: () => <NoSymbolSolid class='h-12 w-12' />,
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
