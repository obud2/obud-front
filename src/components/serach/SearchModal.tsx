import React from 'react';

import { SSearchModal } from './SearchModal.styled';

import Modal from '@components/common/modal/Modal';
import SearchForm from './SearchForm';

const SearchModal = ({ isOpen, isClose }) => {
  return (
    <Modal open={isOpen} close={isClose} ref={{}}>
      <SSearchModal>
        <SearchForm />
      </SSearchModal>
    </Modal>
  );
};

export default SearchModal;
