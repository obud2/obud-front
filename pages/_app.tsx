import Head from 'next/head';

import '@/assets/scss/style.scss';
import '@/styles/globals.css';

import useProgress from '@/hook/useProgress';
import { DehydratedState, QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import LayoutContextProvider from '../src/context/LayoutContext';
import ThemeProvider from '../src/styled/ThemeProvider';
import { APP_PREFIX } from '@/constants';
import CartProvider from '@/context/CartContext';
import OrderProvider from '@/context/OrderContext';
import RootProvider from '@/context/RootContext';
import UserProvider from '@/context/UserContext';
import type { AppProps } from 'next/app';
import React from 'react';

function App({ Component, pageProps }: AppProps<{ dehydratedState: DehydratedState }>) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 50000,
            cacheTime: 50000,
            refetchOnMount: true,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            suspense: false,
          },
        },
      }),
  );

  useProgress();

  return (
    <>
      <Head>
        <title>{APP_PREFIX}</title>
        <meta name="description" content={APP_PREFIX} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0" />
        <meta name="theme-color" content="#4E5C4F" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <LayoutContextProvider>
            <RootProvider>
              <UserProvider>
                <CartProvider>
                  <OrderProvider>
                    <ThemeProvider>
                      <Component {...pageProps} />
                    </ThemeProvider>
                  </OrderProvider>
                </CartProvider>
              </UserProvider>
            </RootProvider>
          </LayoutContextProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default App;
