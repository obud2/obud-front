import React, { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { useQuery } from 'react-query';
import ProductService from 'src/service/ProductService';
import { addComma } from 'src/constants';

import { SClassList } from './ClassList.styled';

const ClassList = ({ id }) => {
  const router = useRouter();

  const { data, isLoading } = useQuery(['class-list', id], () => ProductService.getLessons(id));

  const onClickGoLesson = (e) => {
    // setIsOpen(false);
    router.push(`/lesson/${e}`);
  };

  return (
    <SClassList>
      <ClassListItem data={data} isLoading={isLoading} onClickGoLesson={onClickGoLesson} />
    </SClassList>
  );
};

const ClassListItem = ({ data, isLoading, onClickGoLesson }) => {
  return (
    <React.Fragment>
      {!isLoading &&
        (data?.value?.length > 0 ? (
          <ul className="class-item-list-container">
            {data?.value
              ?.sort((a, b) => a.sortOrder - b.sortOrder)
              ?.map((item) => (
                <li key={item?.id} className={`class-item ${item?.isSoldOut ? 'isSoldOut' : ''}`} onClick={() => onClickGoLesson(item?.id)}>
                  <div className="class-title-container">
                    <p>{item?.title || ''}</p>

                    {item?.isSoldOut && <div className="item-impossible">품절</div>}
                  </div>

                  <div className="class-price-container">
                    <p>{addComma(item?.minPrice || 0)}원</p>

                    <div className="class-arrow-icon" />
                  </div>
                </li>
              ))}
          </ul>
        ) : (
          <p className="empty-text">등록된 수업이 없습니다.</p>
        ))}

      {isLoading && <ClassFallbackLoading />}
    </React.Fragment>
  );
};

const ClassFallbackLoading = () => {
  return (
    <div className="class-fallback-loading">
      <i className="icons svg-loading" />
    </div>
  );
};

export default ClassList;
