import '../styles/Global.scss';
import 'prismjs/themes/prism-okaidia.css';
import '@fortawesome/fontawesome-svg-core/styles.css'; // import Font Awesome CSS
import { config } from '@fortawesome/fontawesome-svg-core';
import type { AppProps } from 'next/app';
import { CssBaseline } from '@mui/material';
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <CssBaseline />
    <Component {...pageProps} />
  </>;
}

export default MyApp;
