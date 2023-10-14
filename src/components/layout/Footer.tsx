import React, { useContext, useState } from 'react';

import { useRouter } from 'next/router';

import { BiArrowToTop } from 'react-icons/bi';

import { APP_PREFIX, IMG_PATH } from 'src/constants';
import { FooterContainer } from './Layout.styled';

import { RootContext } from 'src/context/RootContext';

import CustomImage from '@components/common/image/CustomImage';
import SnsIcons from '@components/common/snsIcon/SnsIcons';
import PolicyModal from '@components/policy/PolicyModal';

type Props = {
  footerHide?: boolean;
};

const Footer = ({ footerHide }: Props) => {
  const root = useContext(RootContext) as any;
  const router = useRouter();

  const [isPolicyOpen, setIsPolicyOpen] = useState({ isOpen: false, type: '' });

  const onClickRouter = (url: string) => {
    router.push(url);
  };

  const onClickPolicyOpen = (type: string) => {
    setIsPolicyOpen({ isOpen: true, type });
  };

  const onClickPolicyClose = () => {
    setIsPolicyOpen({ isOpen: false, type: '' });
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0 });
  };

  if (!footerHide) {
    return (
      <React.Fragment>
        <FooterContainer>
          <div className="footer-arrow-top-button" onClick={scrollTop}>
            <BiArrowToTop />
          </div>

          <div className="footer-info-container">
            <div className="footer-contents-container">
              <div className="footer-contact-menu-items">
                <div className="footer-button" onClick={() => onClickRouter('/about')}>
                  About
                </div>

                <div className="footer-button" onClick={() => onClickRouter('/contact')}>
                  Contact Us
                </div>

                <div className="footer-button" onClick={() => window.open('https://pf.kakao.com/_xaxaxdwxj/chat')}>
                  고객 센터 (평일: 오전 9시 ~ 오후 5시)
                </div>
              </div>

              <div className="footer-general-info-items">
                <span>회사 {root?.info?.companyName || 'obud 오붓'}</span>
                <i className="line" />

                <span>대표 {root?.info?.ceo || '노인혁'}</span>
                <i className="line" />

                {/* {matchese && <div className="line-change small" />} */}

                <span>사업자번호 {root?.info?.companyRegistrationNumber || '828-08-02396'}</span>
                <i className="line" />
                <span>연락처 {root?.info?.contact || '010-7906-8481'}</span>
                <i className="line" />

                <span>통신판매업 {root?.info?.telecommunicationNumber || '제 2022-제주아라-0161'}</span>
                <i className="line" />

                {/* Line */}
                <div className="line-change small" />

                <span>
                  {root?.info?.address ||
                    '주소 제주특별자치도 제주시 중앙로 217 제주벤처마루 | 서울 사무실 서울 행당동 387, 집무실 왕십리점'}
                </span>
              </div>
              <div className="footer-policy-menu-items">
                <span className="footer-button" onClick={() => onClickPolicyOpen('terms')}>
                  이용약관
                </span>
                <i className="line" />

                <span className="footer-button" onClick={() => onClickPolicyOpen('privacyPolicy')}>
                  개인정보 처리 방침
                </span>
                <i className="line" />

                <span className="obud-corp">© obud Co. All rights reserved.</span>
              </div>
            </div>
            <div className="footer-logo-container">
              <div className="footer-logo">
                <CustomImage src={`${IMG_PATH}/obud_logo_footer.png`} layout="fill" alt={APP_PREFIX} />
              </div>

              <div className="footer-sns-icons">
                <SnsIcons />
              </div>
            </div>
          </div>
        </FooterContainer>

        <PolicyModal isOpen={isPolicyOpen?.isOpen} isClose={onClickPolicyClose} type={isPolicyOpen?.type || ''} />
      </React.Fragment>
    );
  }

  return null;
};

export default Footer;
