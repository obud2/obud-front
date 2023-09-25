import React, { useEffect, useRef, useState } from 'react';

import Flicking from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/react-flicking/dist/flicking-inline.css';

import CustomImage, { AutoHeightImageWrapper } from '@components/common/image/CustomImage';

import { SProductImages } from './ProductImages.styled';

const ProductImages = ({ images }) => {
  const swiperRef = useRef();

  const [panel, setPanel] = useState([]);

  const [isAnimating, setIsAnimating] = useState(false);
  const [selectIndex, setSelectIndex] = useState(0);

  useEffect(() => {
    setPanel(images);
  }, [images]);

  const onChanged = (e) => {
    if (swiperRef.current?.animating) return;

    setSelectIndex(e?.index);
  };

  const onMoveStart = () => {
    setIsAnimating(true);
  };

  const onMoveEnd = () => {
    setIsAnimating(false);
  };

  const onClickImageChange = async (e) => {
    if (swiperRef.current?.animating) return;

    if (swiperRef.current) {
      await setSelectIndex(e);
      await swiperRef.current?.moveTo(e);
    }
  };

  return (
    <SProductImages>
      <div className="product-image-slice-container">
        {panel && panel?.length > 0 && (
          <Flicking ref={swiperRef} onChanged={onChanged} onMoveStart={onMoveStart} onMoveEnd={onMoveEnd}>
            {panel?.map((panel) => (
              <div className="panel" key={`panel_${panel?.name}`}>
                <AutoHeightImageWrapper>
                  <CustomImage src={panel?.url} alt="product-images" layout="fill" />
                </AutoHeightImageWrapper>
              </div>
            ))}
          </Flicking>
        )}
      </div>

      <ul className="product-image-select-container">
        {panel &&
          panel?.length > 0 &&
          panel?.map((item, index) => (
            <li
              key={item?.name}
              className={`product-image-select-item ${selectIndex === index ? 'active' : ''}`}
              onClick={() => onClickImageChange(index)}
            >
              <CustomImage src={item?.url} alt="product-images" layout="fill" />
            </li>
          ))}
      </ul>

      <div className={`filcking-animating-block ${isAnimating ? 'active' : ''}`} />
    </SProductImages>
  );
};

export default ProductImages;
