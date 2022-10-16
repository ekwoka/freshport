import { Options } from '$fresh/plugins/twind.ts';

export default {
  selfURL: import.meta.url,
  theme: {
    extend: {
      animation: {
        bounce: 'bounce 2s infinite',
      },
    },
  },
} as Options;
