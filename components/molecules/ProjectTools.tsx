/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';

export const ProjectTools = ({
  core,
  tools,
}: ProjectToolsProps): h.JSX.Element => {
  return (
    <div>
      {core} {tools}
    </div>
  );
};

type ProjectToolsProps = {
  tools: string[];
  core: string[];
};
