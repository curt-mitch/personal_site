import Head from 'next/head';

import { siteTitle } from '../components/layout';
import Main from '../components/main';

export default function Home() {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Main/>
    </>
  );
}
