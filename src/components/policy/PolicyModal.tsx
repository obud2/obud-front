import React, { useEffect, useState } from 'react';

import { useQuery } from 'react-query';
import { info } from 'src/service/InfoService';

import Modal from '@components/common/modal/Modal';
import { SPolicyModal } from './PolicyModal.styled';

const PolicyModal = ({ isOpen, isClose, type }) => {
  const { data } = useQuery(['policy'], () => info('policy'));

  const [title, setTitle] = useState('');

  useEffect(() => {
    let temp = '';

    switch (type) {
      case 'terms':
        temp = '이용약관';
        break;
      case 'privacyPolicy':
        temp = '개인정보처리방침';
        break;
    }

    setTitle(temp);
  }, [type]);

  return (
    <Modal open={isOpen} close={isClose} ref={{}}>
      <SPolicyModal>
        <header className="policy-header">
          <h3>{title}</h3>

          <div className="policy-close-btn" onClick={isClose} />
        </header>

        <div className="policy-data" dangerouslySetInnerHTML={{ __html: data?.[type] || '' }} />
      </SPolicyModal>
    </Modal>
  );
};

export default PolicyModal;
