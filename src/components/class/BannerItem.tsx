import CustomImage from '@components/common/image/CustomImage';
import { Banner } from '@/entities/banner';
import Link from 'next/link';
import styled from 'styled-components';
import { MOBILE } from '@/styled/variablesStyles';

type Props = {
  banner: Banner;
};

const BannerItem = ({ banner }: Props) => {
  const { imageUrl, linkUrl } = banner;

  return (
    <SBannerItem>
      <Link href={linkUrl}>
        <div className="banner-item-images-container">
          <div className="banner-item-image">
            <CustomImage className="banner-image-1" src={imageUrl} width={800} height={800} alt="banner-images" />
          </div>
        </div>
      </Link>
    </SBannerItem>
  );
};

export default BannerItem;

const SBannerItem = styled.div`
  width: 100%;
  height: 100%;

  position: relative;

  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  ${MOBILE} {
    cursor: pointer;

    margin-bottom: 12px;
  }

  .banner-item-images-container {
    width: 100%;
    min-width: 130px;
    height: auto;

    aspect-ratio: 1 / 1;

    position: relative;
    object-fit: cover;

    overflow: hidden;
    cursor: pointer;

    .banner-item-image {
      top: 0;
      left: 0;
      position: absolute;
    }

    .banner-image-1 {
      z-index: 1;
      transition: opacity 0.3s ease-in-out;
    }
  }
`;
