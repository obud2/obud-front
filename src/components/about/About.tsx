import { SAbout } from './About.styled';
import { useContext } from 'react';
import CustomButton from '../common/button/CustomButton';
import CustomImage from '../common/image/CustomImage';
import { MOBILE_SIZE } from '@/styled/variablesStyles';
import { IMG_PATH } from '@/constants';
import { LayoutContext } from '@/context/LayoutContext';

const About = () => {
  const { matchese } = useContext(LayoutContext);
  const SLOGAN = '웰니스 생활을 편리하게';
  const SLOGAN_SUB = 'Book Your Journey to Wellness';

  return (
    <SAbout>
      <article className="obud-about-article">
        <section className="about-section">
          <h1 className="about-slogan">{SLOGAN}</h1>
          <h1 className="about-slogan-sub">{SLOGAN_SUB}</h1>

          <div className="app-download-section">
            <CustomButton onClick={() => null} fullWidth backgroundColor="#344235" height="50px" width="180px">
              Google Play
            </CustomButton>
            <CustomButton onClick={() => null} fullWidth backgroundColor="#344235" height="50px" width="180px">
              App Store
            </CustomButton>
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
