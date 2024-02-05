import React, { useState } from 'react';

import { getUserId } from 'src/constants';

import { SWishList } from './WishList.styled';

import { useQuery } from 'react-query';
import { deleteWishs, getWish } from 'src/service/WishService';

import _ from 'lodash';

import WishItem from './WishItem';
import CustomButton from '@components/common/button/CustomButton';
import CountCheck from '@components/common/countCheck/CountCheck';
import FallBackLoading from '@components/loading/FallBackLoading';

const WishList = () => {
  const userId = getUserId();

  const { data, refetch, isLoading, isFetching } = useQuery(['my-wish-list', userId], () => getWish());

  const [isEdit, setIsEdit] = useState(false);
  const [editList, setEditList] = useState([]);

  const onClickWishListButton = async () => {
    if (editList?.length > 0) {
      const body = {
        wishId: editList,
      };

      await deleteWishs(body);
      await refetch();

      setEditList([]);
      setIsEdit((prev) => !prev);
    } else {
      setEditList([]);
      setIsEdit((prev) => !prev);
    }
  };

  const onEdit = (id) => {
    const temp = _.cloneDeep(editList);
    const findIndex = temp.findIndex((a) => a === id);

    if (findIndex > -1) {
      temp.splice(findIndex, 1);
    } else {
      temp.push(id);
    }

    setEditList(temp);
  };

  const isAllLoading = isLoading || isFetching;

  return (
    <React.Fragment>
      <SWishList>
        <div className="wish-list-header">
          <div className="wish-list-title">
            위시리스트
            <CountCheck count={data && (data?.filter((a) => a?.studioInfo)?.length ?? 0)} />
          </div>

          <CustomButton variant="outlined" onClick={onClickWishListButton} isLoading={isAllLoading} disabled={isAllLoading}>
            {editList?.length > 0 ? '삭제' : '편집'}
          </CustomButton>
        </div>

        <div className="wish-list-container">
          {data && data?.length > 0 ? (
            data
              ?.filter((a) => a?.studioInfo)
              ?.map((item) => (
                <WishItem
                  key={item?.id}
                  id={item?.id}
                  item={item?.studioInfo || {}}
                  isEdit={isEdit}
                  onEdit={onEdit}
                  disabled={isAllLoading}
                />
              ))
          ) : (
            <p className="empty-text">등록 된 위시리스트가 없습니다.</p>
          )}
        </div>
      </SWishList>

      <FallBackLoading isLoading={isAllLoading} />
    </React.Fragment>
  );
};

export default WishList;
