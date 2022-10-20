/** @jsx */
import { tw } from 'twind';
import { Prism } from 'https://esm.sh/react-syntax-highlighter';
import { oneDark } from 'https://esm.sh/react-syntax-highlighter/dist/esm/styles/prism';

const languageRegexp = /^\/\*\* @(\S+) \*\/\n/;

export const CodeBlock = ({ children }: { children: string }): JSX.Element => {
  const language = children.match(languageRegexp)?.[1] || 'js';
  return (
    <Prism
      language={language ?? 'javascript'}
      style={oneDark}
      lineProps={{
        style: {
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap',
          fontFamily: [
            'ml',
            'ui-monospace',
            'SFMono-Regular',
            'Menlo',
            'Monaco',
            'Consolas',
            'Liberation Mono',
            'Courier New',
            'monospace',
          ].join(', '),
        },
      }}
      wrapLines={true}
      class={tw('!font-mono')}>
      {children.replace(languageRegexp, '')}
    </Prism>
  );
};

export const PreCodeBlock = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => <CodeBlock {...children.props} />;
