import React, { useEffect, useRef, useState } from 'react';

import { addComma } from 'src/constants';
import { SEventCreateBottombar } from './EventCreateBottombar.styled';

import { SIMPLE_EVENT, NORMAL_EVENT } from './EventCreate.option';

const EventCreateBottombar = ({ form, type, onChangePrice }) => {
  const showRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [mainHeight, setMainHeight] = useState(1000);

  const [basicPrice, setBasicPrice] = useState(0);
  const [optionPrice, setOptionPrice] = useState({ total: 0, option: [] });

  // 높이 조절
  useEffect(() => {
    if (showRef?.current) {
      setMainHeight(showRef.current.clientHeight);
    }
  }, [showRef, basicPrice, optionPrice, isOpen]);

  useEffect(() => {
    onChangePrice(basicPrice + optionPrice.total);
  }, [basicPrice, optionPrice]);

  // 템플릿 확인
  useEffect(() => {
    let TEMPLETE_PRICE;

    if (type === 'simple') {
      TEMPLETE_PRICE = SIMPLE_EVENT?.price;
    } else if (type === 'normal') {
      TEMPLETE_PRICE = NORMAL_EVENT?.price;
    }

    setBasicPrice(TEMPLETE_PRICE * Number(form?.scale));
  }, [form, type]);

  // 옵션 가격 체크
  useEffect(() => {
    const optionCheck = [];
    let optionTotal = 0;

    if (form?.additional_option) {
      Object.entries(form?.additional_option).forEach((obj) => {
        const [key, value] = obj;

        if (key.includes('use_add')) {
          optionTotal += Number(value?.total);
        } else {
          optionTotal += Number(value?.price);
        }

        optionCheck.push(value);
      });

      setOptionPrice({ total: optionTotal || 0, option: optionCheck || [] });
    }
  }, [form]);

  // 메뉴 열고 닫기
  const onClickShowMain = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <SEventCreateBottombar>
      <div className={`event-create-background ${isOpen ? 'active' : ''}`} />

      <nav
        className="event-create-bottombar-container"
        style={{
          transform: `translateX(-50%) translateY(${isOpen ? 0 : mainHeight}px)`,
        }}
      >
        <div className="event-create-bottombar-box">
          <div className="event-create-bottombar-show-header" onClick={onClickShowMain}>
            <p className="event-create-bottombar-show-title">견적 상세 내역</p>
            <i className={`event-create-bottombar-show-icon ${isOpen ? 'active' : ''}`} />
          </div>

          <div className={`event-create-bottombar-show-main ${isOpen ? 'active' : ''}`} ref={showRef}>
            {/* 기본 사용료 */}
            <div className="event-basic-price-container">
              <div className="event-title">기본 사용료</div>

              <div className="event-basic-price-main">
                <EvnetOptionByPrice label="서비스 이용료" price={basicPrice} />
              </div>
            </div>

            {/* 추가 기능 옵션 */}
            {optionPrice?.option && optionPrice?.option?.length > 0 && (
              <div className="event-basic-add-option-container">
                <div className="event-title">추가 기능</div>

                <div className="event-add-option-container">
                  {optionPrice?.option?.map((option) => {
                    const label = option?.label || '';
                    let price = option?.price || 0;
                    let sub;

                    if (option?.id.includes('use_add')) {
                      price = option?.total;
                      sub = ` (+${addComma(Number(option?.num || 0))})`;
                    }

                    return <EvnetOptionByPrice key={option?.id} label={label} sub={sub} price={price} />;
                  })}
                </div>
              </div>
            )}

            {/* 총 합계 */}
            <div className="event-total-price-container">
              <div className="event-total-price-by-optionPrice">
                기본 사용료 &nbsp; <i>{addComma(basicPrice || 0)}</i>원
                {optionPrice?.total > 0 && (
                  <React.Fragment>
                    &nbsp; + &nbsp; <i>{addComma(optionPrice?.total || 0)}</i>원
                  </React.Fragment>
                )}
              </div>

              <div className="event-total-price">
                <i>총 합계</i> &nbsp;&nbsp;&nbsp;&nbsp;
                <p>
                  {addComma(basicPrice + optionPrice.total || 0)}
                  <i>원</i>
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </SEventCreateBottombar>
  );
};

const EvnetOptionByPrice = ({ label, sub, price }) => {
  return (
    <div className="event-oprtion-by-price">
      <div>
        {label}
        {sub && <i>{sub}</i>}
      </div>
      <p>{addComma(price) || 0} 원</p>
    </div>
  );
};

export default EventCreateBottombar;
