import BaseTitle from '@/components/base/BaseTitle';
import CustomImage from '@/components/common/image/CustomImage';
import { IMG_PATH } from '@/constants';
import { LayoutContext } from '@/context/LayoutContext';
import BannerService from '@/service/BannerService';
import { MOBILE_SIZE } from '@/styled/variablesStyles';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { SAbout } from './About.styled';
import AboutBanner from './banner/AboutBanner';

const About = () => {
  const { matchese } = useContext(LayoutContext);
  const SLOGAN = 'Wellness Life With Yoga';

  const { data } = useQuery(['banner'], () => BannerService.info('about'));

  return (
    <SAbout>
      <BaseTitle title="About us" />

      <article className="obud-about-article">
        <section className="about-section">
          <div className="about-image-item">
            <CustomImage
              src={`${IMG_PATH}/about/about-top-left${matchese ? '_m' : '_w'}.png`}
              width={matchese ? MOBILE_SIZE : 600}
              height={matchese ? MOBILE_SIZE : 400}
              layout={matchese ? 'fill' : 'intrinsic'}
            />
          </div>

          <div className="about-image-item right">
            <CustomImage
              src={`${IMG_PATH}/about/about-top-right${matchese ? '_m' : '_w'}.png`}
              width={matchese ? MOBILE_SIZE : 400}
              height={matchese ? MOBILE_SIZE : 590}
              layout={matchese ? 'fill' : 'intrinsic'}
            />
          </div>
        </section>

        <section className="about-section">
          <div className="about-image-item left">
            <CustomImage
              src={`${IMG_PATH}/about/about-bottom-left${matchese ? '_m' : '_w'}.png`}
              width={matchese ? MOBILE_SIZE : 400}
              height={matchese ? MOBILE_SIZE : 590}
              layout={matchese ? 'fill' : 'intrinsic'}
            />
          </div>

          <div className="about-image-item">
            <CustomImage
              src={`${IMG_PATH}/about/about-bottom-right${matchese ? '_m' : '_w'}.png`}
              width={matchese ? MOBILE_SIZE : 600}
              height={matchese ? MOBILE_SIZE : 400}
              layout={matchese ? 'fill' : 'intrinsic'}
            />
          </div>
        </section>

        <div className="about-sloan text-delay-animation">{SLOGAN}</div>
      </article>

      <div className="about-line text-delay-animation"></div>

      <div className="about-partner-place">
        <h3 className="partner-place-title text-delay-animation">PARTNER PLACE</h3>

        <p className="partner-place-contents text-delay-animation">
          세계 어디서나 원하는 공간에서 요가할 수 있는 요가 라이프를 꿈꾸며, <br />
          특별한 공간에서의 색다른 요가 경험을 제공합니다.
        </p>
      </div>

      <div className="about-us-banner-container">
        <AboutBanner banner={data?.images || []} />
      </div>
    </SAbout>
  );
};

export default About;
