/** @jsx h */
import { Fragment, h } from 'preact';
import { Footer, Hero, Skills } from 'sections';

export default function Home() {
  return (
    <Fragment>
      <Hero />
      <Skills />
      <Footer />
    </Fragment>
  );
}
