import type { AppProps } from 'next/app'
import {CacheProvider, EmotionCache} from "@emotion/react";
import createEmotionCache from "../services/createEmotionCache";
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "../props/theme";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { emotionCache = clientSideEmotionCache, Component, pageProps } = props;

  return (
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
  );
}

export default MyApp
