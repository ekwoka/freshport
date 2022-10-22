import { classNames } from '../../utils/classNames.ts';
import { getRespSrc, getRespSrcSet } from '../../utils/respimg.ts';

export const Image = ({ src, alt, class: className }: ImageProps) => (
  <img
    class={classNames(
      'mx-auto w-full max-w-prose rounded-xl shadow-lg',
      className ?? 'my-4'
    )}
    src={getRespSrc(src)}
    srcset={getRespSrcSet(src)}
    loading="lazy"
    alt={alt}
    width={16}
    height={9}
    sizes="90vw"
  />
);

type ImageProps = {
  src: string;
  alt: string;
  class?: string;
};
