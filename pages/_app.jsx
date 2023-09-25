import React from 'react';

import Head from 'next/head';

import '../src/styles/globals.css';
import '../src/assets/scss/style.scss';

import useProgress from 'src/hook/useProgress';

import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';

import ThemeProvider from '../src/styled/ThemeProvider';
import LayoutContextProvider from '../src/context/LayoutContext';

import { APP_PREFIX } from '../src/constants';

import RootProvider from 'src/context/RootContext';
import UserProvider from 'src/context/UserContext';
import CartProvider from 'src/context/CartContext';
import OrderProvider from 'src/context/OrderContext';

// TODO
// 스튜디오 리스트 변경 작업 -
// 클래스 필터 추가.
// 어드민 강사 전용 페이지 추가 .

/*

  컴포넌트 마다 페이지 렌더는 여기서 발생..
  _app은 서버로 요청이 들어왔을 때 가장 먼저 실행되는 컴포넌트로, 페이지에 적용할 공통 레이아웃의 역할을 합니다.

  주요 사용 목적
  모든 컴포넌트에 공통으로 적용할 속성 관리

  _document는 언제나 서버에서 실행되므로 브라우저 api 또는 이벤트 핸들러가 포함된 코드는 실행되지 않습니다.

*/
function MyApp({ Component, pageProps }) {
  useProgress();

  const queryClientRef = React.useRef();

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
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
    });
  }

  return (
    <React.Fragment>
      <Head>
        <title>{APP_PREFIX}</title>
        <meta name="description" content={APP_PREFIX} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0" />
        <meta name="theme-color" content="#4E5C4F" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps?.dehydratedState}>
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
    </React.Fragment>
  );
}

export default MyApp;
