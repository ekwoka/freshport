import { Options } from '$fresh/plugins/twind.ts';

export default {
  selfURL: import.meta.url,
  theme: {
    extend: {
      animation: {
        bounce: 'bounce 2s infinite',
      },
      fontFamily: {
        mono: [
          'ml',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
    },
  },
} as Options;
