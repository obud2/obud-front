import React, { useState, useEffect, useRef } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { SFileUploading, UploadingHelpMessage } from './FileUploading.styled';
import { SlSizeFullscreen } from 'react-icons/sl';
import { BsZoomIn } from 'react-icons/bs';
import { BsArrowLeft } from 'react-icons/bs';

import FileUploadingMoveAction from './FileUploading.option';
import imageCompression from 'browser-image-compression';

const SIZE_OPTION = [
  {
    id: 'original',
    label: '원본',
  },
  {
    id: '1_1',
    label: '1:1',
  },
  {
    id: '4_3',
    label: '4:3',
  },
  {
    id: '16_9',
    label: '16:9',
  },
];

// 업로드 될 이미지 기본 사이즈
const BASIC_SIZE = 613;

const FileUploading = ({ image, onSubmit, onClose }) => {
  const canvasRef = useRef();

  const [coord, setCoord] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState({ zoomValue: 0, zoom: 0 });

  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });
  const [renderSize, setRenderSize] = useState({ width: 0, height: 0 });

  const [isSizeBox, setIsSizeBox] = useState(false);
  const [isZoominBox, setIsZoominBox] = useState(false);
  const [selectSize, setSelectSize] = useState('original');

  const [isNext, setIsNext] = useState(false);

  /**
   * 이미지 경로 확인 ( 네츄럴 width, 네츄럴 height 확인)
   */
  useEffect(() => {
    if (image?.path) {
      const IMG = document.createElement('img');
      IMG.src = image?.path;
      IMG.onload = () => {
        setCoord({ x: 0, y: 0 });
        setZoom({ zoomValue: 0, zoom: 0 });
        setSelectSize('original');

        setNaturalSize({ width: IMG?.naturalWidth, height: IMG?.naturalHeight });
      };
    }
  }, [image]);

  /**
   * 비율 체크해서 가로, 세로 확인 로직
   */
  useEffect(() => {
    if (naturalSize?.width && naturalSize?.height) {
      let ratio = 'horizontally';

      let iWidth; // 이미지 가로
      let iHeight; // 이미지 세로
      let cWidth; // 캔버스 가로
      let cHeight; // 캔버스 세로

      let rWidth; // 비율조정 이미지 가로
      let rHeight; // 비율조정 이미지 세로
      let rSize; // 렌더될 사이즈 기본 비율

      const naturalW = naturalSize?.width;
      const naturalH = naturalSize?.height;

      if (naturalW > naturalH) rSize = naturalH;
      else if (naturalW < naturalH) rSize = naturalW;
      else rSize = naturalW;

      // 가로, 세로 체크
      if (naturalW > naturalH) ratio = 'horizontally'; // 세로가 긴
      else if (naturalW < naturalH) ratio = 'vertically'; // 가로가 긴

      // 기본 사이즈 보다 크면 변경
      if (rSize < BASIC_SIZE) rSize = BASIC_SIZE;
      if (rSize > window.innerHeight - 200) rSize = BASIC_SIZE;

      switch (selectSize) {
        case 'original':
          if (ratio === 'horizontally') {
            iWidth = BASIC_SIZE;
            iHeight = (naturalH * BASIC_SIZE) / naturalW;

            cWidth = BASIC_SIZE;
            cHeight = (naturalH * BASIC_SIZE) / naturalW;

            rWidth = naturalW;
            rHeight = naturalH;
          } else if (ratio === 'vertically') {
            iWidth = (naturalW * BASIC_SIZE) / naturalH;
            iHeight = BASIC_SIZE;

            cWidth = (naturalW * BASIC_SIZE) / naturalH;
            cHeight = BASIC_SIZE;

            rWidth = naturalW;
            rHeight = naturalH;
          }
          break;
        case '1_1':
          if (ratio === 'horizontally') {
            iWidth = (naturalW * rSize) / naturalH;
            iHeight = rSize;

            cWidth = rSize;
            cHeight = rSize;
          } else if (ratio === 'vertically') {
            iWidth = rSize;
            iHeight = (naturalH * rSize) / naturalW;

            cWidth = rSize;
            cHeight = rSize;
          }
          break;
        case '4_3':
          if (ratio === 'horizontally') {
            iWidth = (naturalW * rSize) / naturalH;
            iHeight = rSize;

            cWidth = rSize;
            cHeight = (rSize * 3) / 4;
          } else if (ratio === 'vertically') {
            iWidth = rSize;
            iHeight = (naturalH * rSize) / naturalW;

            cWidth = rSize;
            cHeight = (rSize * 3) / 4;
          }

          if (iWidth < cWidth) iWidth = cWidth;
          if (iHeight < cHeight) iHeight = cHeight;
          break;
        case '16_9':
          if (ratio === 'horizontally') {
            iWidth = rSize;
            iHeight = (naturalH * rSize) / naturalW;

            cWidth = rSize;
            cHeight = (rSize * 9) / 16;
          } else if (ratio === 'vertically') {
            iWidth = (naturalW * rSize) / naturalH;
            iHeight = rSize;

            cWidth = rSize;
            cHeight = (rSize * 9) / 16;
          }

          if (iWidth < cWidth) iWidth = cWidth;
          if (iHeight < cHeight) iHeight = cHeight;
          break;
      }

      setCoord({ x: 0, y: 0 });
      setImgSize({ width: Math.round(iWidth), height: Math.round(iHeight) });
      setCanvasSize({ width: Math.round(cWidth), height: Math.round(cHeight) });
      setRenderSize({ width: Math.round(rWidth), height: Math.round(rHeight) });
    }
  }, [selectSize, naturalSize]);

  /**
   * 캔버스에 이미지 그리는 작업 ( 미리보기 )
   */
  useEffect(() => {
    if (canvasRef?.current) {
      const newImg = new Image();
      newImg.src = image?.path;

      // 캔버스 비율 조정
      canvasRef.current.width = canvasSize?.width;
      canvasRef.current.height = canvasSize?.height;

      let dx = 0;
      let dy = 0;
      let imgWidth = imgSize.width;
      let imgHeight = imgSize.height;
      let iWidth = imgSize.width;
      let iHeight = imgSize.height;
      let cWidth = canvasSize?.width;
      let cHeight = canvasSize?.height;

      const coordX = coord?.x;
      const coordY = coord?.y;

      // 원본 이미지 비율 고정
      if (selectSize === 'original') {
        canvasRef.current.width = renderSize?.width;
        canvasRef.current.height = renderSize?.height;

        cWidth = renderSize?.width;
        cHeight = renderSize?.height;

        imgWidth = renderSize.width;
        imgHeight = renderSize.height;
        iWidth = renderSize.width;
        iHeight = renderSize.height;
      }

      // 이미지 확대 한 비율 대로 확대
      if (zoom?.zoom) {
        imgWidth = iWidth * zoom.zoom;
        imgHeight = iHeight * zoom.zoom;
        dx += dx * zoom.zoom;
        dy += dy * zoom.zoom;
      }

      // 캔버스에 그릴 이미지 위치 좌표 계산
      if (imgWidth >= cWidth) dx = (cWidth - imgWidth) / 2;
      if (imgHeight >= cHeight) dy = (cHeight - imgHeight) / 2;

      // 움직인 위치 별로 계산 ( X좌표 )
      if (coordX > 0) dx += coordX;
      else if (coordX < 0) dx = coordX + dx;

      // 움직인 위치 별로 계산 ( Y좌표 )
      if (coordY > 0) dy += coordY;
      else if (coordY < 0) dy = coordY + dy;

      canvasRef.current.getContext('2d').drawImage(newImg, dx, dy, imgWidth, imgHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNext, canvasRef]);

  const onClickOpenSize = () => {
    setIsSizeBox((prev) => !prev);
  };

  const onClickOpenZoomin = () => {
    setIsZoominBox((prev) => !prev);
  };

  const onClickSize = (size) => {
    setSelectSize(size);
    setZoom({ zoomValue: 0, zoom: 1 });

    setIsSizeBox(false);
    setIsZoominBox(false);
  };

  const onChangeZoom = (e) => {
    const value = e.target.value;

    setIsSizeBox(false);
    setZoom((prev) => ({ ...prev, zoomValue: value, zoom: 1 + 1 * (value / 100) }));
  };

  const onNext = () => {
    setIsNext(true);

    setIsSizeBox(false);
    setIsZoominBox(false);
  };

  /**
   *
   * 캔버스 이미지 추출 후 Jpeg로 변환 및 이미지 용량 축소
   */
  const onClickRenderImg = async () => {
    // canvas의 dataurl를 blob(file)화 하는 과정
    const dataURL = canvasRef.current?.toDataURL('image/jpeg');

    const name = `${uuidv4().split('-')[0]}.jpeg`;
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // 리사이징된 file 객체
    const tmpThumbFile = new Blob([ab], { type: mimeString });

    const newFile = new File([tmpThumbFile], name, {
      name,
      path: dataURL,
      size: image?.size,
      type: tmpThumbFile?.type,
    });

    const options = {
      maxSizeMB: 1,
    };

    const compressedFile = await imageCompression(newFile, options);

    const promise = imageCompression.getDataUrlFromFile(compressedFile);
    promise.then((result) => {
      newFile.path = result;

      clearState();
      onSubmit([newFile]);
    });
  };

  const clearState = () => {
    setIsNext(false);
    setIsSizeBox(false);
    setSelectSize('original');
  };

  return (
    image?.path && (
      <SFileUploading basicSize={BASIC_SIZE}>
        <div className="uploading-item-background" />

        <div className="uploading-item-option-container">
          <FileUploadHeader
            isNext={isNext}
            onNext={onNext}
            onClose={onClose}
            onPrev={setIsNext}
            onClickRenderImg={onClickRenderImg}
            //
          />

          <div className="uploading-item-option-body">
            {!isNext && (
              <React.Fragment>
                <div
                  className="uploading-item-presentation"
                  style={{
                    width: `${canvasSize.width}px`,
                    height: `${canvasSize.height}px`,
                  }}
                >
                  <div
                    className="uploading-item-img"
                    aria-label={selectSize}
                    style={{
                      backgroundImage: `url(${image?.path})`,
                      width: `${imgSize.width}px`,
                      height: `${imgSize.height}px`,
                      transform: `translate3d(${coord?.x}px, ${coord?.y}px, 0px) scale(${zoom.zoom || 1})`,
                    }}
                  />
                  <FileUploadingMoveAction
                    updateCoord={setCoord}
                    movableX={(imgSize.width - canvasSize.width) / 2}
                    movableY={(imgSize.height - canvasSize.height) / 2}
                  />
                </div>

                <FileUploadOption
                  zoom={zoom}
                  selectSize={selectSize}
                  isSizeBox={isSizeBox}
                  isZoominBox={isZoominBox}
                  onClickSize={onClickSize}
                  onChangeZoom={onChangeZoom}
                  onClickOpenSize={onClickOpenSize}
                  onClickOpenZoomin={onClickOpenZoomin}
                />
              </React.Fragment>
            )}

            {isNext && (
              <canvas
                ref={canvasRef}
                style={{
                  width: `${canvasSize.width}px`,
                  height: `${canvasSize.height}px`,
                }}
              />
            )}

            <UploadingHelpMessage>
              <div className="uploading-help-message">
                현재 비율 : {SIZE_OPTION?.map((a) => a?.id === selectSize && a?.label)}
                {selectSize === 'original' && ` ( ${naturalSize?.width} x ${naturalSize?.height} )`}
              </div>

              {isNext && (
                <div className="uploading-help-message">
                  <b>*</b> 미리보기 화면에 맞춰 업로드 됩니다.
                </div>
              )}
            </UploadingHelpMessage>
          </div>
        </div>
      </SFileUploading>
    )
  );
};

/**
 *  업로드 옵션 ( 이미지 위치 조절 / 이미지 줌/아웃 )
 */
const FileUploadOption = ({ isSizeBox, selectSize, zoom, isZoominBox, onClickSize, onChangeZoom, onClickOpenSize, onClickOpenZoomin }) => {
  return (
    <>
      <ul className={`uploading-option-size-select-box ${isSizeBox ? 'open' : ''}`}>
        {SIZE_OPTION?.map((item) => (
          <li
            key={item?.label}
            className={`uploading-option-select-item ${selectSize === item?.id ? 'active' : ''}`}
            onClick={() => onClickSize(item?.id)}
          >
            {item?.label}
          </li>
        ))}
      </ul>

      <div className={`uploading-option-zoom-select-box ${isZoominBox ? 'open' : ''}`}>
        <input
          className="zoom-input"
          type="range"
          value={zoom?.zoomValue}
          max={100}
          min={0}
          onChange={onChangeZoom}
          style={{
            backgroundImage: `linear-gradient(to right, rgb(255, 255, 255) 0%, rgb(255, 255, 255) ${
              100 - (100 - zoom.zoomValue || 0)
            }%, rgb(0, 0, 0) ${100 - (100 - zoom.zoomValue || 0)}%, rgb(0, 0, 0) 100%)`,
          }}
        />
      </div>

      <div className={`uploading-option-box size ${isSizeBox ? 'active' : ''}`} onClick={onClickOpenSize}>
        <SlSizeFullscreen />
      </div>

      <div className={`uploading-option-box zoomin ${isZoominBox ? 'active' : ''}`} onClick={onClickOpenZoomin}>
        <BsZoomIn />
      </div>
    </>
  );
};

/**
 * 파일 업로드 헤더
 */
const FileUploadHeader = ({ isNext, onClose, onNext, onClickRenderImg, onPrev }) => {
  return (
    <div className="uploading-item-option-header">
      {!isNext ? (
        <button className="uploading-item-option-close-btn" onClick={onClose} />
      ) : (
        <button className="uploading-item-option-prev-btn" onClick={() => onPrev(false)}>
          <BsArrowLeft />
        </button>
      )}

      <h1 className="uploading-item-option-title">{!isNext ? '자르기' : '미리보기'}</h1>
      {!isNext ? (
        <button className="uploading-item-upload" onClick={onNext}>
          다음
        </button>
      ) : (
        <button className="uploading-item-upload" onClick={onClickRenderImg}>
          확인
        </button>
      )}
    </div>
  );
};

export default FileUploading;
