import { Head } from '$fresh/runtime.ts';
import { AppProps } from '$fresh/server.ts';
import { Navigation } from "molecules";
import { Footer } from "sections";

export default function App(props: AppProps) {
  return (
    <>
      <Head>
        <title>Eric Kwoka</title>
        <style>{'html {scroll-behavior: smooth}'}</style>
      </Head>
      <Navigation />
      <props.Component />
      <Footer />
    </>
  );
}
