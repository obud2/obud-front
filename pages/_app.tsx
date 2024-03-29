import Head from 'next/head';

import '@/assets/scss/style.scss';
import '@/styles/globals.css';

import { DehydratedState, QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import LayoutContextProvider from '../src/context/LayoutContext';
import ThemeProvider from '../src/styled/ThemeProvider';
import { APP_PREFIX } from '@/constants';
import OrderProvider from '@/context/OrderContext';
import RootProvider from '@/context/RootContext';
import UserProvider from '@/context/UserContext';
import type { AppProps } from 'next/app';
import React from 'react';
import Script from 'next/script';

function App({ Component, pageProps }: AppProps<{ dehydratedState: DehydratedState }>) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30000,
            cacheTime: 30000,
            refetchOnMount: true,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            suspense: false,
          },
        },
      }),
  );

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
        `}
      </Script>
      <Head>
        <title>{APP_PREFIX}</title>
        <meta name="description" content={APP_PREFIX} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0" />
        <meta name="theme-color" content="#344235" />
        <meta name="obud-app" content="app-id=6459364190, app-argument=obud://home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <LayoutContextProvider>
            <RootProvider>
              <UserProvider>
                <OrderProvider>
                  <ThemeProvider>
                    <Component {...pageProps} />
                  </ThemeProvider>
                </OrderProvider>
              </UserProvider>
            </RootProvider>
          </LayoutContextProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default App;
