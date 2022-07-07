import { h } from 'preact';

import {
  AlpineIcon,
  PreactIcon,
  ShopifyIcon,
  TailwindIcon,
  TypeScriptIcon,
} from 'icons';

export const skills: Skill[] = [
  {
    name: 'Preact/React',
    type: 'frontend',
    Icon: PreactIcon,
  },
  {
    name: 'TypeScript',
    type: 'other',
    Icon: TypeScriptIcon,
  },
  {
    name: 'Tailwind CSS',
    type: 'frontend',
    Icon: TailwindIcon,
  },
  {
    name: 'Shopify',
    type: 'other',
    Icon: ShopifyIcon,
  },
  {
    name: 'Alpine',
    type: 'frontend',
    Icon: AlpineIcon,
  },
];

type Skill = {
  name: string;
  type: 'frontend' | 'backend' | 'other';
  // deno-lint-ignore no-explicit-any
  Icon: (props: any) => h.JSX.Element;
};
