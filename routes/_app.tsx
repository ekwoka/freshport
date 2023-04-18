import { Head } from '$fresh/runtime.ts';
import { AppProps } from '$fresh/server.ts';
import { Navigation } from 'molecules';
import { Footer } from 'sections';

export default function App(props: AppProps) {
  return (
    <>
      <Head>
        <title>Eric Kwoka</title>
        <style>
          {
            'html {scroll-behavior: smooth} @font-face {font-family: ml;src: url(/mono.woff);}.font-mono {font-variant-ligatures: common-ligatures;}'
          }
        </style>
        <meta
          name="description"
          content="Hi, I'm Eric Kwoka. I am a Full-Stack Engineer and User Experience Professional"
        />
      </Head>
      <Navigation />
      <props.Component />
      <Footer />
    </>
  );
}
