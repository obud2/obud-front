import { useEffect } from 'react';

import { IMP_CODE } from 'src/constants';

import alert from 'src/helpers/alert';
import OrderService from 'src/service/OrderService';

const useBookingSetting = () => {
  useEffect(() => {
    const jquery = document.createElement('script');
    const iamport = document.createElement('script');

    jquery.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
    iamport.src = 'https://cdn.iamport.kr/v1/iamport.js';

    document.head.appendChild(jquery);
    document.head.appendChild(iamport);

    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  const impPay = (param, option, setLoading) => {
    window?.IMP.init(IMP_CODE);

    return new Promise((resolve, reject) => {
      // 결제 테이블 추가작업.
      OrderService.setOrder(param)
        .then((res) => {
          if (res?.result === 'success') {
            const requestPay = {
              pg: 'danal_tpay.9810030929',
              pay_method: option?.payMethod,
              merchant_uid: res.val.id,
              name: option?.title,
              amount: option?.amount,
              buyer_email: option?.userInfo?.email,
              buyer_name: option?.userInfo?.name,
            };

            if (requestPay?.amount === 0) {
              // 결제 금액 0원일 시
              const merchant = {
                merchant_uid: res.val.id || '',
                imp_uid: 'atoz', // 0원 결제 시 impId  : atoz
                payInfo: {},
              };

              const cancel = {
                merchant_uid: res.val.id || '',
                imp_uid: 'atoz',
                cancelAmount: option?.amount,
                reason: '결제 중 취소',
              };

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
              // 결제 모듈 띄우기 및 결제 처리
              setLoading(false);
              window?.IMP.request_pay(requestPay, (rsp) => {
                const merchant = {
                  merchant_uid: res.val.id || '',
                  imp_uid: rsp.imp_uid,
                  payInfo: rsp,
                };

                const cancel = {
                  merchant_uid: res.val.id || '',
                  imp_uid: rsp.imp_uid,
                  cancelAmount: option?.amount,
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
                  OrderService.orderFali(merchant)
                    .then(() => {
                      resolve(rsp);
                    })
                    .catch(() => {
                      const cancelRes = OrderService.payCancel(cancel);

                      resolve(cancelRes);
                    });
                }
              });
            }
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);

          alert('', error?.meta);
          setLoading(false);
        });
    });
  };

  return { impPay };
};

export default useBookingSetting;
