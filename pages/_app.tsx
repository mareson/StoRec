import type { AppProps } from 'next/app'
import {CacheProvider, EmotionCache} from "@emotion/react";
import createEmotionCache from "../services/createEmotionCache";
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "../props/theme";
import {SnackbarProvider} from "notistack";
import DateAdapter from '@mui/lab/AdapterDateFns';
import {LocalizationProvider} from "@mui/lab";
import csLocale from "date-fns/locale/cs";

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
            <SnackbarProvider>
                <LocalizationProvider dateAdapter={DateAdapter} locale={csLocale}>
                    <Component {...pageProps} />
                </LocalizationProvider>
            </SnackbarProvider>
        </ThemeProvider>
      </CacheProvider>
  );
}

export default MyApp
