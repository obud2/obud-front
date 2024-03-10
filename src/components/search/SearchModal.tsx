import { SSearchModal } from './SearchModal.styled';

import Modal from '@components/common/modal/Modal';
import Search from './Search';

const SearchModal = ({ isOpen, isClose }) => {
  return (
    <Modal open={isOpen} close={isClose}>
      <SSearchModal>
        <Search />
      </SSearchModal>
    </Modal>
  );
};

export default SearchModal;
