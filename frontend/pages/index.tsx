import Head from 'next/head';

import { siteTitle } from '../components/layout';
import Homepage from '../components/homepage';

export default function Home() {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Homepage/>
    </>
  );
}
