/* eslint-disable no-alert */
/* eslint-disable no-console */
import { useContext, useEffect } from 'react';

import { IMP_CODE } from 'src/constants';

import alert from 'src/helpers/alert';
import OrderService from 'src/service/OrderService';
import { RequestPayParams } from '@/portone';
import { PAYMENT_METHOD } from '@components/booking/Booking.option';
import { useQueryClient } from 'react-query';
import { CartContext } from '@/context/CartContext';
import cart from '@pages/cart';
import router from 'next/router';

type CreateOrderParam = {
  planId: string;
  price: number;
  startDate: string;
  endDate: string;
  instructor: string;
  reservationer: string;
  reservationerHp: string;
  reservationCount: number;
  payOption: string;
  payOptionCount: number;
};

type PayOptions = {
  payMethod: (typeof PAYMENT_METHOD)[number]['id'];
  userInfo: { name: string; hp: string; email?: string };
  title: string;
  amount: number;
};

const useBookingSetting = () => {
  const queryClient = useQueryClient();
  const { deleteCart } = useContext<any>(CartContext);

  useEffect(() => {
    const jquery = document.createElement('script');
    const iamport = document.createElement('script');

    jquery.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
    iamport.src = 'https://cdn.iamport.kr/v1/iamport.js';

    document.head.appendChild(jquery);
    document.head.appendChild(iamport);

    const handleMessage = async (event: MessageEvent) => {
      const { data } = event;
      console.log('event', event);
      console.log('data', data);
      const parsedData = JSON.parse(data);
      console.log('parsedData', parsedData);
      const response = parsedData.payResultParams;

      const merchant = {
        merchant_uid: response.merchant_uid,
        imp_uid: response.imp_uid,
        payInfo: response,
      };

      window.alert(data);
      window.alert(event);
      window.alert(parsedData);
      window.alert(`${response.imp_uid} - ${response.status}`);

      if (response.imp_uid && response.status === 'paid') {
        try {
          const { val, error_msg: errorMsg } = await OrderService.orderComplete(merchant);
          const orderStatus = val.orderStatus || 'FAIL';

          queryClient.invalidateQueries(['my-order-list'], { refetchInactive: true });

          if (orderStatus === 'COMPLETE') {
            alert('', '감사합니다. <br /> 예약이 완료되었습니다.', '', '', () => {
              deleteCart(cart);
              router.replace('/my/order');
            });
          }
          if (orderStatus === 'FAIL') {
            if (errorMsg) {
              alert('', errorMsg, '', '', () => {
                router.push('/class');
              });
            } else {
              alert('', '예약을 취소하였습니다.', '', '', () => {
                router.push('/class');
              });
            }
          }
        } catch (err) {
          alert('', '예약 실패하였습니다. <br /> 잠시 후 다시시도해주세요.');
        }
      }
    };

    window.addEventListener('message', (event) => handleMessage(event));

    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
      window.removeEventListener('message', (event) => handleMessage(event));
    };
  }, []);

  const impPayNative = async (createOrderParams: CreateOrderParam[], payOptions: PayOptions) => {
    if (typeof window === 'undefined' || !window.IMP) {
      throw new Error('결제 준비가 되지 않았어요. 개발자에게 문의해주세요!');
    }

    const res = await OrderService.setOrder(createOrderParams);

    if (res.result !== 'success') throw new Error();

    const requestPayParams: RequestPayParams = {
      app_scheme: 'obud',
      pg: `${'danal_tpay'}.${9810030929}`,
      pay_method: payOptions.payMethod,
      merchant_uid: res.val.id,
      amount: payOptions.amount,
      name: payOptions.title,
      buyer_name: payOptions.userInfo?.name,
      buyer_email: payOptions.userInfo?.email,
      buyer_tel: payOptions.userInfo?.hp,
    };

    if (requestPayParams.amount === 0) {
      // 결제 금액 0원일 시
      const merchant = {
        merchant_uid: res.val.id || '',
        imp_uid: 'atoz', // 0원 결제 시 impId  : atoz
        payInfo: {},
      };

      const cancel = {
        merchant_uid: res.val.id || '',
        imp_uid: 'atoz',
        cancelAmount: payOptions?.amount,
        reason: '결제 중 취소',
      };

      // 결제 성공
      try {
        const orderRes = await OrderService.orderComplete(merchant);
        return orderRes;
      } catch (err) {
        const cancelRes = await OrderService.payCancel(cancel);
        return cancelRes;
      }
    }

    const params = {
      method: 'IAMPORT_PAYMENT',
      userCode: IMP_CODE, // 가맹점 식별코드
      payParams: requestPayParams,
      type: 'payment', //     결제와 본인인증을 구분하기 위한 필드
      returnUrl: window.location.href,
    };

    window.ReactNativeWebView?.postMessage(JSON.stringify(params));
  };

  const impPay = (createOrderParams: CreateOrderParam[], payOptions: PayOptions, setLoading: (loading: boolean) => void) => {
    if (typeof window === 'undefined' || !window.IMP) {
      throw new Error('결제 준비가 되지 않았어요. 개발자에게 문의해주세요!');
    }

    window.IMP.init(IMP_CODE);

    return new Promise((resolve, reject) => {
      // 결제 테이블 추가작업.
      OrderService.setOrder(createOrderParams)
        .then((res) => {
          if (res.result !== 'success') reject(res);

          const requestPayParams: RequestPayParams = {
            app_scheme: 'obud',
            pg: `${'danal_tpay'}.${9810030929}`,
            pay_method: payOptions.payMethod,
            merchant_uid: res.val.id,
            amount: payOptions.amount,
            name: payOptions.title,
            buyer_name: payOptions.userInfo?.name,
            buyer_email: payOptions.userInfo?.email,
          };

          if (requestPayParams.amount === 0) {
            // 결제 금액 0원일 시
            const merchant = {
              merchant_uid: res.val.id || '',
              imp_uid: 'atoz', // 0원 결제 시 impId  : atoz
              payInfo: {},
            };

            const cancel = {
              merchant_uid: res.val.id || '',
              imp_uid: 'atoz',
              cancelAmount: payOptions?.amount,
              reason: '결제 중 취소',
            };

            // 결제 성공
            return OrderService.orderComplete(merchant)
              .then((res) => {
                resolve(res);
              })
              .catch(async () => {
                const cancelRes = OrderService.payCancel(cancel);
                resolve(cancelRes);
              });
          }

          // 결제 모듈 띄우기 및 결제 처리
          setLoading(false);

          window.IMP?.request_pay(requestPayParams, (rsp) => {
            const merchant = {
              merchant_uid: res.val.id || '',
              imp_uid: rsp.imp_uid,
              payInfo: rsp,
            };

            const cancel = {
              merchant_uid: res.val.id || '',
              imp_uid: rsp.imp_uid,
              cancelAmount: payOptions?.amount,
              reason: '결제 중 취소',
            };

            setLoading(true);
            if (rsp.imp_uid && rsp.status === 'paid') {
              // 결제 성공
              OrderService.orderComplete(merchant)
                .then((res) => {
                  resolve(res);
                })
                .catch(async () => {
                  const cancelRes = OrderService.payCancel(cancel);
                  resolve(cancelRes);
                });
            } else {
              // 결제 실패
              OrderService.orderFail(merchant)
                .then(() => {
                  resolve(rsp);
                })
                .catch(() => {
                  const cancelRes = OrderService.payCancel(cancel);
                  resolve(cancelRes);
                });
            }
          });
        })
        .catch((error) => {
          reject(error);

          alert('', error?.meta);
          setLoading(false);
        });
    });
  };

  return { impPay, impPayNative };
};

export default useBookingSetting;
