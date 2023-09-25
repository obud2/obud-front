import React, { useRef, useState } from 'react';

const FileUploadingMoveAction = ({ updateCoord, movableX, movableY }) => {
  const moveRef = useRef();

  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);

  const handleDragStart = async (e) => {
    await false;

    if (e?.pageX) {
      await setStartX(e.pageX);
      await setStartY(e.pageY);
    }
    if (window.TouchEvent && e instanceof TouchEvent) {
      await setStartX(e.touches[0].pageX);
      await setStartY(e.touches[0].pageY);
    }

    await setIsDrag(true);
  };

  const handleDrop = async () => {
    if (moveRef?.current) {
      let xDistanceMoved = currentX - startX;
      let yDistanceMoved = currentY - startY;

      if (xDistanceMoved > 0) {
        if (xDistanceMoved >= movableX) xDistanceMoved = movableX;
      } else if (xDistanceMoved < 0) {
        if (xDistanceMoved <= movableX * -1) xDistanceMoved = movableX * -1;
      } else if (xDistanceMoved === 0) {
        xDistanceMoved = 0;
      }

      if (yDistanceMoved > 0) {
        if (yDistanceMoved >= movableY) yDistanceMoved = movableY;
      } else if (yDistanceMoved < 0) {
        if (yDistanceMoved <= movableY * -1) yDistanceMoved = movableY * -1;
      } else if (yDistanceMoved === 0) {
        yDistanceMoved = 0;
      }

      await updateCoord({ x: xDistanceMoved, y: yDistanceMoved });
      await setIsDrag(false);
    }
  };

  const handleMove = async (e) => {
    if (!isDrag) return;

    if (window?.TouchEvent) {
      if (e?.touches) {
        await setCurrentX(e.touches[0].pageX);
        await setCurrentY(e.touches[0].pageY);
      } else {
        await setCurrentX(e.pageX);
        await setCurrentY(e.pageY);
      }
    } else {
      await setCurrentX(e.pageX);
      await setCurrentY(e.pageY);
    }

    const xDistanceMoved = currentX - startX;
    const yDistanceMoved = currentY - startY;

    await updateCoord({ x: xDistanceMoved, y: yDistanceMoved });
  };

  return (
    <>
      <div
        ref={moveRef}
        className={`uploading-grab ${isDrag ? 'active' : ''}`}
        onMouseDown={(e) => handleDragStart(e)}
        onMouseUp={(e) => handleDrop(e)}
        onMouseMove={(e) => handleMove(e)}
      />

      <div className="uploading-grab-grid">
        {new Array(8).fill('').map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className="uploading-grab-grid-item" key={`grab-grid-item-${_}-${i}`} />
        ))}
      </div>
    </>
  );
};

export default FileUploadingMoveAction;
