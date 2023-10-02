import React, { useState } from 'react';

import Image from 'next/image';
import styled from 'styled-components';

import { IMG_PATH } from 'src/constants';

/**
 * Layout 속성
 *
 *    이미지 사이즈가 고정되어 있는 경우 (layout=“fixed”, layout=“intrinsic”의 경우 1x, 2x 2개의 srcSet만 생성)
 *    intrinsic: default, 컨테이너 사이즈가 이미지 사이즈보다 작아졌을 때 컨테이너에 맞게 크기를 줄임
 *    fixed: (컨테이너 사이즈와 관계없이) 이미지 사이즈를 width, height 속성 값으로 고정
 *
 *    layout=“relative”, layout=“fill” 일 때 설정되는 srcSet은 next.config.js의 images.imageSizes와 images.deviceSizes에 의해 지정
 *    responsive: 작은 컨테이너에서는 크기가 줄어들고, 큰 컨테이너에서는 크기가 늘어남(이미지 비율 유지)
 *    fill: relative 포지션을 가진 조상의 너비, 높이와 동일하게 조정함. 주로 objectFit 속성과 함께 사용
 *
 */
const CustomImage = ({
  className,
  src,
  alt,
  width,
  height,
  quality = 80,
  loading = 'lazy',
  placeholder = 'blur',
  layout = 'intrinsic',
}: any) => {
  const NO_IMG = `${IMG_PATH}/noImg.png`;

  const [isError, setIsError] = useState(false);

  const loader = ({ src, width, quality }: any) => {
    return `${src}?w=${width}&q=${quality}`;
  };

  return (
    <Image
      className={className}
      src={isError ? NO_IMG : src}
      width={width}
      height={height}
      layout={layout}
      loader={loader}
      loading={loading}
      placeholder={placeholder}
      quality={quality}
      style={{ WebkitUserSelect: 'none' }}
      onError={() => {
        setIsError(true);
      }}
      alt={alt || 'images'}
      blurDataURL="/img/blurDataUrl.png"
    />
  );
};

export const AutoHeightImageWrapper = styled.div`
  width: 100%;

  & > span {
    position: unset !important;

    & .autoImage {
      object-fit: contain !important;
      position: relative !important;
      height: auto !important;
    }
  }
`;

export default CustomImage;
