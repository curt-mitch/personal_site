import '../styles/Global.scss';
import 'prismjs/themes/prism-okaidia.css';
import '@fortawesome/fontawesome-svg-core/styles.css'; // import Font Awesome CSS
import { config } from '@fortawesome/fontawesome-svg-core';
import type { AppProps } from 'next/app';
import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from "@mui/material/styles";
// import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../src/createEmotionCache';
import Layout from '../components/layout';
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS

// const cache = createEmotionCache();

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StyledEngineProvider>
  </>;
}

export default MyApp;
