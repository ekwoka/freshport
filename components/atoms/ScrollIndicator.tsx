import { ChevronDoubleDownSolid } from '@heroicons';
import { SimpleButton } from 'atoms';

export const ScrollIndicator = ({
  target,
}: {
  target: string;
}): JSX.Element => {
  return (
    <SimpleButton
      href={target}
      class="hover absolute bottom-24 z-10 mx-auto h-10 w-10 animate-bounce p-8 opacity-50 transition-all hover:opacity-100 md:bottom-16">
      <ChevronDoubleDownSolid class="h-10 w-10" />
    </SimpleButton>
  );
};
