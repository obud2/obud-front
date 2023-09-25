import React, { Suspense, useState } from 'react';

import moment from 'moment';
import 'moment/locale/ko';

import { addComma, textSilce } from 'src/constants';

import { useQuery } from 'react-query';
import OrderService from 'src/service/OrderService';

import Modal from '@components/common/modal/Modal';
import { SCancelModal } from './CancelModal.styled';
import CustomButton from '@components/common/button/CustomButton';

const CancelModal = ({ id, isOpen, isClose, isLoading, onClickPayCancel }) => {
  return (
    <Modal open={isOpen} close={isClose}>
      <Suspense>
        <FetchData id={id} isClose={isClose} isLoading={isLoading} onClickPayCancel={onClickPayCancel} />
      </Suspense>
    </Modal>
  );
};

const FetchData = ({ id, isClose, isLoading, onClickPayCancel }) => {
  const { data } = useQuery(['cancel-check', id], () => OrderService.cancelCheck(id), { enabled: !!id, suspense: true });

  const [isOpen, setIsOpen] = useState(true);

  return (
    <SCancelModal>
      <section className="cancel-header">
        <h5>{textSilce(data?.studiosTitle || '', 10)}</h5>

        <h2>{data?.lessonTitle || ''}</h2>

        <p>
          {`${moment(data?.startDate || '')
            .locale('ko')
            .format('YYYY. MM. DD(ddd) HH:mm')}~${moment(data?.endDate || '').format('HH:mm')}`}
        </p>
      </section>

      <section className="cancel-price-container">
        <div className="cancel-price">
          <p>결제금액 합계</p>
          <p>{addComma(data?.amount || 0)}원</p>
        </div>

        <div className="cancel-price">
          <p>취소수수료</p>
          <p>{addComma((data?.amount || 0) - (data?.cancelAmount || 0))}원</p>
        </div>
      </section>

      <section className="cancel-total-price">
        <div className="cancel-price">
          <p>환불금액</p>
          <p>{addComma(data.cancelAmount || 0)}원</p>
        </div>

        <div className="cancel-policy" onClick={() => setIsOpen((prev) => !prev)}>
          <p>취소/환불 규정 안내</p>
          <div className={`policy-arrow ${isOpen ? 'open' : ''}`} />
        </div>

        {isOpen && <div className="policy-container">{data?.refundPolicy || '-'}</div>}
      </section>

      <section className="cancel-footer-container">
        <p>취소하시겠습니까?</p>
        <p>취소 후 예약을 복구할 수 없습니다.</p>

        <div className="cancel-button-container">
          <CustomButton fullWidth variant="outlined" onClick={isClose} disabled={isLoading} isLoading={isLoading}>
            취소
          </CustomButton>

          <CustomButton fullWidth onClick={onClickPayCancel} disabled={isLoading} isLoading={isLoading}>
            확인
          </CustomButton>
        </div>
      </section>
    </SCancelModal>
  );
};

export default CancelModal;
