import { useEffect, useRef } from 'react';
import { IMP_CODE, PG } from 'src/constants';

import alert from 'src/helpers/alert';
import { RequestPayParams } from '@/portone';
import { PAYMENT_METHOD } from '@components/booking/Booking.option';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { Order } from '@/context/OrderContext';
import { PassService } from '@/service/PassService';
import { Pass } from '@/entities/pass';

export type CreatePurchaseParam = {
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

export type PayOptions = {
  payMethod: (typeof PAYMENT_METHOD)[number]['id'];
  userInfo: { name: string; hp: string; email?: string };
  title: string;
  amount: number;
};

const usePurchasePass = ({ passId }: { passId: Pass['id'] }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const completedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!passId) return;

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

      if (response.imp_uid && response.status === 'paid') {
        if (completedRef.current) return;

        try {
          completedRef.current = true;

          await PassService.purchasePassComplete({
            passId,
            merchantUid: response.merchant_uid,
            impUid: response.imp_uid,
            payAmount: response.paid_amount,
          });
          queryClient.invalidateQueries();

          alert('', '감사합니다. <br /> 예약이 완료되었습니다.', '', '', () => {
            setTimeout(() => {
              completedRef.current = false;
            }, 30_000);
            router.replace('/my');
          });
        } catch (err) {
          alert('', '죄송합니다. 예약에 실패하였습니다. <br /> 잠시 후 다시 시도해주세요.');
        }
      } else {
        if (completedRef.current) return;

        try {
          completedRef.current = true;
          await PassService.purchasePassFail({ passId, merchantUid: response.merchant_uid });
          alert('', '예약에 실패했습니다. 결제는 자동 취소됩니다.', '', '', () => {
            router.push('/class');
          });
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
  }, [passId]);

  const impPayNative = async (payOptions: PayOptions): Promise<void> => {
    if (typeof window === 'undefined' || !window.IMP) {
      throw new Error('결제 준비가 되지 않았어요. 개발자에게 문의해주세요!');
    }
    const { merchantUid } = await PassService.purchasePass({ passId });

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

    // 결제 금액 0원일 시
    // iamport를 호출하지 않고 즉시 Complete 상태로 변경한다.
    if (requestPayParams.amount === 0) {
      try {
        await PassService.purchasePassComplete({
          passId,
          merchantUid,
          impUid: 'freshyeoul',
          payAmount: payOptions.amount,
        });

        return;
      } catch (err) {
        await PassService.purchasePassFail({
          passId,
          merchantUid,
        });
        return;
      }
    }

    // return 후 pass id를 알아야 한다.
    const returnUrlSearchParams = new URLSearchParams();
    returnUrlSearchParams.append('passId', passId.toString());

    const params = {
      method: 'IAMPORT_PAYMENT',
      userCode: IMP_CODE, //  가맹점 식별코드
      payParams: requestPayParams,
      type: 'payment', //     결제와 본인인증을 구분하기 위한 필드
      returnUrl: `${window.location.href}?${returnUrlSearchParams.toString()}`,
    };

    window.ReactNativeWebView?.postMessage(JSON.stringify(params));
  };

  const impPay = async (
    payOptions: PayOptions,
    setLoading: (loading: boolean) => void,
  ): Promise<{ orderStatus?: 'COMPLETE' | 'FAIL'; error?: string }> => {
    if (typeof window === 'undefined' || !window.IMP) {
      throw new Error('결제 준비가 되지 않았어요. 개발자에게 문의해주세요!');
    }

    window.IMP.init(IMP_CODE);

    // 주문 생성
    const { merchantUid } = await PassService.purchasePass({ passId });
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

    // 결제 금액 0원일 시
    // iamport를 호출하지 않고 즉시 Complete 상태로 변경한다.
    if (requestPayParams.amount === 0) {
      // 결제 성공
      try {
        await PassService.purchasePassComplete({
          passId,
          merchantUid,
          impUid: 'freshyeoul',
          payAmount: payOptions.amount,
        });

        return {
          orderStatus: 'COMPLETE',
        };
      } catch (e) {
        await PassService.purchasePassFail({ passId, merchantUid });
        return {
          orderStatus: 'FAIL',
          error: '예약 완료에 실패했습니다.',
        };
      }
    }

    // 결제 모듈 띄우기 및 결제 처리
    setLoading(false);
    return await new Promise((resolve) => {
      window.IMP?.request_pay(requestPayParams, async (rsp) => {
        setLoading(true);

        try {
          // 결제 성공
          if (rsp.imp_uid && rsp.status === 'paid' && rsp.success) {
            await PassService.purchasePassComplete({
              passId,
              merchantUid,
              impUid: rsp.imp_uid,
              payAmount: payOptions.amount,
            });
            resolve({ orderStatus: 'COMPLETE' });
          } else {
            // 결제 실패
            await PassService.purchasePassFail({ passId, merchantUid });
            resolve({
              orderStatus: 'FAIL',
              error: rsp.error_msg || '결제에 실패했습니다.',
            });
          }
        } catch (err) {
          // unknown error
          alert('', (err as any)?.meta || '알 수 없는 에러가 발생했어요. 고객센터로 문의해주세요.');
          throw err;
        } finally {
          setLoading(false);
        }
      });
    });
  };

  return { impPay, impPayNative };
};

export default usePurchasePass;
