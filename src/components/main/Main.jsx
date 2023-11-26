import { useContext } from 'react';

import { LayoutContext } from 'src/context/LayoutContext';

import Link from 'next/link';
import { SMain } from './Main.styled';

import CustomButton from '@components/common/button/CustomButton';
import CustomImage, { AutoHeightImageWrapper } from '@components/common/image/CustomImage';

const Main = ({ banner }) => {
  const CLASS_URL = '/class';
  const SLOGAN = 'Book your journey to wellness';

  return (
    <SMain>
      <div className="main-render-banner-container">
        <MainRenderBanner banner={banner || {}} />
      </div>

      <div className="obud-main-shadow-container" />

      <div className="obud-main-text-container">
        <p className="obud-main-text">{SLOGAN}</p>

        <Link href={CLASS_URL}>
          <a href={CLASS_URL}>
            <CustomButton className="obud-main-class-button" variant="outlined">
              클래스 신청
            </CustomButton>
          </a>
        </Link>
      </div>

      <div className="obud-active-logo-container">
        <AutoHeightImageWrapper>
          <CustomImage src="/img/obud_logo_circle.png" layout="fill" alt="obud-log" />
        </AutoHeightImageWrapper>
      </div>
    </SMain>
  );
};

const MainRenderBanner = ({ banner }) => {
  const { matchese } = useContext(LayoutContext);

  // 이미지 렌더
  if (banner?.bannerType === 'video') {
    let src = !matchese ? banner?.video?.[0]?.url : banner?.video_m?.[0]?.url;

    if (!src) src = banner?.video?.[0]?.url;

    return <video className="obud-main-video" src={src} type="video/mp4" autoPlay muted loop />;
  }

  //  비디오 렌더
  if (banner?.bannerType === 'image') {
    let src = !matchese ? banner?.images?.[0]?.url : banner?.images_m?.[0]?.url;

    if (!src) src = banner?.images?.[0]?.url;

    return (
      <CustomImage
        className="obud-main-image"
        src={src}
        layout="fill"
        //
      />
    );
  }

  // API 호출 안될 시 임시 배너
  if (!banner?.bannerType) {
    return (
      <CustomImage
        className="obud-main-image"
        src="/img/temporary_banner.jpg"
        layout="fill"
        //
      />
    );
  }
};

export default Main;
