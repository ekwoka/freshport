/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';
import { classNames } from 'utils';

export const PreactIcon = (): h.JSX.Element => {
  return (
    <svg
      class={tw`h-12 w-12 fill-current text-[#673ab8]`}
      viewBox="-256 -256 512 512">
      <title>Preact</title>
      <path
        d="M0,-256 221.7025033688164,-128 221.7025033688164,128 0,256 -221.7025033688164,128 -221.7025033688164,-128z"
        fill="currentColor"
      />
      <ellipse
        class={tw`text-white`}
        cx="0"
        cy="0"
        rx="75px"
        ry="196px"
        stroke-width="16px"
        stroke-dasharray="387 60"
        stroke-dashoffset="0"
        fill="none"
        stroke="currentColor"
        transform="rotate(52)"
      />
      <ellipse
        class={tw`text-white`}
        cx="0"
        cy="0"
        rx="75px"
        ry="196px"
        stroke-width="16px"
        stroke-dasharray="387 60"
        stroke-dashoffset="0"
        fill="none"
        stroke="currentColor"
        transform="rotate(-52)"
      />
      <circle cx="0" cy="0" r="34" fill="currentColor" class={tw`text-white`} />
    </svg>
  );
};
