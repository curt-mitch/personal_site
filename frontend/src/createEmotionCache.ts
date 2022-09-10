import createCache from '@emotion/cache';

// cache for allowing override of MUI styles in client
export default function createEmotionCache() {
  return createCache({ key: 'css' });
}
