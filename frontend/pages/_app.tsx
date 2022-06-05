import '../styles/globals.css';
import 'prismjs/themes/prism-okaidia.css';
import '@fortawesome/fontawesome-svg-core/styles.css'; // import Font Awesome CSS
import { config } from '@fortawesome/fontawesome-svg-core';
import type { AppProps } from 'next/app';
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
