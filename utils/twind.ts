import { IS_BROWSER } from '$fresh/runtime.ts';
import { Configuration, setup } from 'twind';
import typography from 'https://esm.sh/@twind/typography';
export * from 'twind';
export const config: Configuration = {
  darkMode: 'media',
  mode: 'silent',
  plugins: {
    ...typography(),
  },
};
if (IS_BROWSER) setup(config);
