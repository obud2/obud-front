/* eslint-disable no-alert */
import { useState } from 'react';

import { IMP_CODE, PG } from 'src/constants';

import alert from 'src/helpers/alert';
import { RequestPayParams } from '@/portone';
import { PAYMENT_METHOD } from '@components/booking/Booking.option';
import { Order } from '@/context/OrderContext';
import { orderComplete, createOrder, payCancel, orderFail } from '@/service/OrderService';

export type CreateOrderParam = {
  couponId: string | null;
  planId: string;
  price: number;
  payAmount: number;
  startDate: string;
  endDate: string;
  instructor: string;
  reservationer: string;
  reservationerHp: string;
  reservationCount: number;
  payOption: Order['payOption'];
  payOptionCount: number;
};

type PayOptions = {
  payMethod: (typeof PAYMENT_METHOD)[number]['id'];
  userInfo: { name: string; hp: string; email?: string };
  title: string;
  amount: number;
};

const useBookingSetting = () => {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const impPayNative = async (createOrderParams: CreateOrderParam[], payOptions: PayOptions): Promise<void> => {
    if (typeof window === 'undefined' || !window.IMP) {
      throw new Error('결제 준비가 되지 않았어요. 개발자에게 문의해주세요!');
    }

    setIsProcessingPayment(true);
    const { merchantUid } = await createOrder(createOrderParams);

    const requestPayParams: RequestPayParams = {
      app_scheme: 'obud',
      pg: PG,
      pay_method: payOptions.payMethod,
      merchant_uid: merchantUid,
      amount: payOptions.amount,
      name: payOptions.title.slice(0, 8),
      buyer_tel: payOptions.userInfo?.hp,
      buyer_name: payOptions.userInfo?.name,
      buyer_email: payOptions.userInfo?.email,
    };

    if (requestPayParams.amount === 0) {
      // 결제 금액 0원일 시
      const merchant = {
        merchant_uid: merchantUid || '',
        imp_uid: 'freshyeoul', // 0원 결제 시 impId  : freshyeoul or atoz
        payInfo: {},
      };

      const cancel = {
        merchant_uid: merchantUid || '',
        imp_uid: 'freshyeoul',
        cancelAmount: payOptions?.amount,
        reason: '결제 중 취소',
      };

      // 주문 성공 -> Native IMPort로 넘어가야 함.
      try {
        await orderComplete(merchant);
        return;
      } catch (err) {
        await payCancel(cancel);
        return;
      }
    }

    const params = {
      method: 'IAMPORT_PAYMENT',
      userCode: IMP_CODE, // 가맹점 식별코드
      payParams: requestPayParams,
      type: 'payment', //     결제와 본인인증을 구분하기 위한 필드
      returnUrl: 'https://www.obud.co/booking',
    };

    // TODO: move to hook
    window.ReactNativeWebView?.postMessage(JSON.stringify(params));
  };

  const impPay = async (
    createOrderParams: CreateOrderParam[],
    payOptions: PayOptions,
    setLoading: (loading: boolean) => void,
  ): Promise<{ orderStatus?: 'COMPLETE' | 'FAIL'; error?: string }> => {
    if (typeof window === 'undefined' || !window.IMP) {
      throw new Error('결제 준비가 되지 않았어요. 개발자에게 문의해주세요!');
    }

    window.IMP.init(IMP_CODE);

    try {
      // 주문 생성
      const { merchantUid } = await createOrder(createOrderParams);

      const requestPayParams: RequestPayParams = {
        app_scheme: 'obud',
        pg: PG,
        pay_method: payOptions.payMethod,
        merchant_uid: merchantUid,
        amount: payOptions.amount,
        name: payOptions.title.slice(0, 8),
        buyer_tel: payOptions.userInfo?.hp,
        buyer_name: payOptions.userInfo?.name,
        buyer_email: payOptions.userInfo?.email,
      };

      if (requestPayParams.amount === 0) {
        // 결제 금액 0원일 시
        const merchant = {
          merchant_uid: merchantUid || '',
          imp_uid: 'freshyeoul', // 0원 결제 시 impId: atoz or freshyeoul
          payInfo: {},
        };

        const cancel = {
          merchant_uid: merchantUid || '',
          imp_uid: 'freshyeoul',
          cancelAmount: payOptions?.amount,
          reason: '결제 중 취소',
        };

        // 결제 성공
        try {
          return await orderComplete(merchant);
        } catch (e) {
          await payCancel(cancel);
          return {
            orderStatus: 'FAIL',
            error: '예약 완료에 실패했습니다.',
          };
        }
      }

      // 결제 모듈 띄우기 및 결제 처리
      setLoading(false);
      setIsProcessingPayment(false);

      return await new Promise((resolve) => {
        window.IMP?.request_pay(requestPayParams, (rsp) => {
          const merchant = {
            merchant_uid: merchantUid || '',
            imp_uid: rsp.imp_uid,
            payInfo: rsp,
          };

          const cancel = {
            merchant_uid: merchantUid || '',
            imp_uid: rsp.imp_uid,
            cancelAmount: payOptions?.amount,
            reason: '결제 중 취소',
          };

          setLoading(true);
          setIsProcessingPayment(true);
          if (rsp.imp_uid && rsp.status === 'paid' && rsp.success) {
            // 결제 성공
            orderComplete(merchant)
              .then((res) => {
                resolve(res);
              })
              .catch(async () => {
                await payCancel(cancel);
                resolve({
                  orderStatus: 'FAIL',
                  error: rsp.error_msg || '예약 완료에 실패했습니다.',
                });
              })
              .finally(() => {
                setIsProcessingPayment(false);
              });
          } else {
            // 결제 실패
            orderFail(merchant)
              .then(() => {
                resolve({
                  orderStatus: 'FAIL',
                  error: rsp.error_msg || '결제에 실패했습니다.',
                });
              })
              .catch(async () => {
                await payCancel(cancel);
                resolve({
                  orderStatus: 'FAIL',
                  error: rsp.error_msg || '결제에 실패했습니다.',
                });
              })
              .finally(() => {
                setIsProcessingPayment(false);
              });
          }
        });
      });
    } catch (error) {
      alert('', (error as any)?.meta || '알 수 없는 에러가 발생했어요. 고객센터로 문의해주세요.');
      throw error;
    }
  };

  return { impPay, impPayNative, isProcessingPayment };
};

export default useBookingSetting;
