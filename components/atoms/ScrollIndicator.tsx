import { ChevronDoubleDownSolid } from '@heroicons';
import { SimpleButton } from 'atoms';
import { classNames } from '../../utils/classNames.ts';

export const ScrollIndicator = ({
  target,
  bottomClass,
}: {
  target: string;
  bottomClass?: string;
}): JSX.Element => {
  return (
    <SimpleButton
      href={target}
      class={classNames(
        'hover absolute z-10 mx-auto animate-bounce p-8 opacity-50 transition-all hover:opacity-100',
        bottomClass ?? 'bottom-24 md:bottom-16'
      )}>
      <span class="sr-only">Scroll Down</span>
      <ChevronDoubleDownSolid class="h-10 w-10" />
    </SimpleButton>
  );
};
