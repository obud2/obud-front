import { SAbout } from './About.styled';
import { useContext, useEffect, useState } from 'react';
import CustomButton from '../common/button/CustomButton';
import CustomImage from '../common/image/CustomImage';
import { MOBILE_SIZE } from '@/styled/variablesStyles';
import { IMG_PATH } from '@/constants';
import { LayoutContext } from '@/context/LayoutContext';
import { useRouter } from 'next/router';

const About = () => {
  const router = useRouter();
  const { matchese } = useContext(LayoutContext);
  const SLOGAN = '웰니스 생활을 편리하게';
  const SLOGAN_SUB = 'Book Your Journey to Wellness';

  const [device, setDevice] = useState<'ios' | 'android' | 'web'>('web');

  useEffect(() => {
    const userAgent = navigator.userAgent;
    // eslint-disable-next-line no-nested-ternary
    setDevice(userAgent.indexOf('isIOS') !== -1 ? 'ios' : userAgent.indexOf('isAndroid') !== -1 ? 'android' : 'web');
  }, []);

  return (
    <SAbout>
      <article className="obud-about-article">
        <section className="about-section">
          <h1 className="about-slogan">{SLOGAN}</h1>
          <h1 className="about-slogan-sub">{SLOGAN_SUB}</h1>

          <div className="app-download-section">
            {device !== 'ios' && (
              <CustomButton
                onClick={() => router.push('https://play.google.com/store/apps/details?id=co.obud')}
                fullWidth
                backgroundColor="#344235"
                height="50px"
                width="180px"
              >
                Google Play
              </CustomButton>
            )}
            {device !== 'android' && (
              <CustomButton
                onClick={() => router.push('https://apps.apple.com/kr/app/obud/id6459364190')}
                fullWidth
                backgroundColor="#344235"
                height="50px"
                width="180px"
              >
                App Store
              </CustomButton>
            )}
          </div>
        </section>

        <section className="about-image-section">
          <CustomImage
            src={`${IMG_PATH}/about/about_app_screen.png`}
            width={matchese ? MOBILE_SIZE : 410}
            height={matchese ? MOBILE_SIZE : 400}
          />
        </section>
      </article>
    </SAbout>
  );
};

export default About;
