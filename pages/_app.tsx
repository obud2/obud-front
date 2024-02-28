import Head from 'next/head';
import alert from 'src/helpers/alert';

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
import { orderComplete } from '@/service/OrderService';
import router from 'next/router';

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
  const completedRef = React.useRef<boolean>(false);

  React.useEffect(() => {
    const jquery = document.createElement('script');
    const iamport = document.createElement('script');

    jquery.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
    iamport.src = 'https://cdn.iamport.kr/v1/iamport.js';

    document.head.appendChild(jquery);
    document.head.appendChild(iamport);

    const handleMessage = async (event: MessageEvent) => {
      const { data } = event;
      const parsedData = JSON.parse(data);
      const response = parsedData.payResultParams;

      const merchant = {
        merchant_uid: response.merchant_uid,
        imp_uid: response.imp_uid,
        payInfo: response,
      };

      if (response.imp_uid && response.status === 'paid') {
        if (completedRef.current) {
          return;
        }
        try {
          completedRef.current = true;

          const data = await orderComplete(merchant);
          const orderStatus = data.orderStatus || 'FAIL';

          queryClient.invalidateQueries(['my-order-list'], { refetchInactive: true });

          if (orderStatus === 'COMPLETE') {
            alert('', '감사합니다. <br /> 예약이 완료되었습니다.', '', '', () => {
              setTimeout(() => {
                completedRef.current = false;
              }, 30_000);
              router.replace('/my/order');
            });
          }
          if (orderStatus === 'FAIL') {
            if (data.error) {
              alert('', data.error, '', '', () => {
                router.push('/class');
              });
            } else {
              alert('', '예약에 실패했습니다. 결제는 자동 취소됩니다.', '', '', () => {
                router.push('/class');
              });
            }
          }
        } catch (err) {
          alert('', '죄송합니다. 예약에 실패하였습니다. <br /> 잠시 후 다시 시도해주세요.');
        }
      }
    };

    const userAgent = navigator.userAgent;
    if (/isIOS/.test(userAgent)) {
      window.addEventListener('message', handleMessage);
    } else if (/isAndroid/i.test(userAgent)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      document.addEventListener('message', handleMessage);
    }

    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);

      if (/isIOS/.test(userAgent)) {
        window.removeEventListener('message', handleMessage);
      } else if (/isAndroid/i.test(userAgent)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.removeEventListener('message', handleMessage);
      }
    };
  }, []);

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
