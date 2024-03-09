import { PassService } from '@/service/PassService';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { MAX_WIDTH, TABLET, TABLET_MAX_WIDTH, MOBILE } from '@/styled/variablesStyles';
import CustomCheckBox from '../common/checkbox/CustomCheckBox';
import CustomRadio, { CustomRadioItem } from '../common/radio/CustomRadio';
import usePurchasePass, { PayOptions } from './hook/usePurchasePass';
import { UserContext } from '@/context/UserContext';
import alert from '@/helpers/alert';

const PurchasePass = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { passId: id } = router.query;
  const passId = Number(id as string);

  const { user } = useContext(UserContext);

  const [isChecked, setIsChecked] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { data: passDetail } = usePassDetail(passId);

  const { impPay, impPayNative } = usePurchasePass({ passId });

  const handlePurchase = async () => {
    if (!user?.name || !user?.phone || !user?.email) {
      alert('', '회원정보를 찾을 수 없습니다.');
      return;
    }

    setIsLoading(true);
    const payOption: PayOptions = {
      payMethod: 'card',
      userInfo: {
        name: user.name,
        hp: user.phone,
        email: user.email,
      },
      title: passDetail?.title || '',
      amount: passDetail?.price || 0,
    };

    if (window.ReactNativeWebView) {
      try {
        await impPayNative(payOption);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        await impPay(payOption, setIsLoading);
        queryClient.invalidateQueries();
        alert('', '결제가 완료되었습니다.', '', '', () => {
          router.push('/my/pass');
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        alert('', '죄송합니다. 결제에 실패하였습니다.<br /> 잠시 후 다시 시도해주세요.', '', '', () => {
          router.push('/class');
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <SPurchasePass>
      {/* 예약자 정보 영역 */}
      <section className="purchase-info-container">
        <header className="purchase-header">
          <div className="purchase-title">패스 구매하기</div>
        </header>
        <main className="purchase-content">
          <div className="purchase-content-title">{passDetail?.place.title}</div>
          {passDetail?.programs.map((program) => (
            <div className="purchase-info" key={program.id}>
              <p>{program.title}</p>
            </div>
          ))}
          <div className="purchase-info">{passDetail?.title}</div>
          <div className="pass-detail">{passDetail?.durationInDays}일권</div>
        </main>
      </section>

      {/* 결제 정보 영역 */}
      <section className="purchase-info-container">
        <header className="purchase-header">
          <div className="purchase-title">결제 수단</div>
        </header>

        <div className="purchase-content">
          <CustomRadio onChange={() => null}>
            <CustomRadioItem label="신용카드" value="credit" isChecked />
          </CustomRadio>
        </div>
      </section>

      <section className="purchase-info-container">
        <header className="purchase-header">
          <div className="purchase-title">최종 결제 금액</div>
          <div>{passDetail?.price.toLocaleString()}원</div>
        </header>
      </section>

      <section className="purchase-info-container">
        <header className="purchase-header">
          <div className="purchase-title">환불 규정</div>
        </header>

        <CustomCheckBox
          label="예약 서비스 이용을 위한 개인정보 수집 및 제3자 제공, 취소/환불 규정을 확인하였으며 이에 동의합니다."
          value={isChecked}
          onClick={(e: boolean) => setIsChecked(e)}
        />
      </section>

      <section className="purchase-pay-footer">
        <button disabled={!isChecked || isLoading} onClick={handlePurchase}>
          동의하고 결제하기
        </button>
      </section>
    </SPurchasePass>
  );
};

const usePassDetail = (passId: number) => {
  return useQuery(['pass', passId], () => PassService.getPassDetail({ passId }));
};

export default PurchasePass;

const SPurchasePass = styled.div`
  width: 100%;
  max-width: ${MAX_WIDTH};
  padding: 16px;

  margin: 0 auto;

  display: flex;
  justify-content: center;

  gap: 32px;

  ${TABLET} {
    max-width: ${TABLET_MAX_WIDTH};
  }

  ${MOBILE} {
    max-width: 100%;
    flex-direction: column;
    gap: 45px;
  }

  .purchase-info-container {
    width: 100%;
    height: 100%;
    font-size: 1.4rem;
    border-bottom: 1px solid ${(props) => props.theme.core_color_slate_50};

    ${MOBILE} {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      border-bottom: none;
    }

    .purchase-header {
      width: 100%;

      padding-bottom: 8px;
      border-bottom: 1px solid ${(props) => props.theme.core_color_slate_50};

      font-size: 1.8rem;
      font-weight: 600;

      display: flex;
      align-items: center;
      justify-content: space-between;

      ${MOBILE} {
        font-size: 1.6rem;
      }
    }

    .purchase-content {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 16px 0;
      gap: 10px;
      font-size: 1.2rem;

      color: #565656;

      .purchase-info {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &.cancel {
          color: #f25656;
        }
      }

      .purchase-content-title {
        font-size: 1.4rem;
        font-weight: 600;
      }

      .pass-detail {
        font-weight: bold;
        margin-top: 12px;
      }
    }
  }

  .purchase-pay-footer {
    width: 100%;
    display: flex;
    flex-direction: column;

    ${MOBILE} {
      margin-top: 20px;
    }

    button {
      width: 100%;
      height: 48px;
      border-radius: 8px;
      background-color: ${(props) => props.theme.main_color_slate_500};
      color: white;
      font-size: 1.6rem;
      font-weight: 700;
      margin-top: 24px;

      &:disabled {
        background-color: #d6d6d6;
        color: #a2a2a2;
      }
    }
  }
`;
