import Head from 'next/head';

import Homepage from '../components/homepage';

export default function Home() {
  return (
    <>
      <Head>
        <title>Curtis Mitchell&apos;s Personal Site</title>
      </Head>
      <Homepage/>
    </>
  );
}
