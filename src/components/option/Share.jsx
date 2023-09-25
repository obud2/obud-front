import React, { useEffect, useState } from 'react';

import { SShare } from './Share.styled';
import ShareBox from './ShareBox';
import { bodyHiddenToggle } from 'src/constants';

const Share = ({ data, title, isHide }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    bodyHiddenToggle(isOpen);
  }, [isOpen]);

  const onClickShareBox = () => {
    setIsOpen(true);
  };

  return (
    <React.Fragment>
      <SShare onClick={onClickShareBox} isHide={isHide}>
        <i className="icons share" />
      </SShare>

      <ShareBox data={data} title={title} isOpen={isOpen} isClose={() => setIsOpen(false)} />
    </React.Fragment>
  );
};

export default Share;
