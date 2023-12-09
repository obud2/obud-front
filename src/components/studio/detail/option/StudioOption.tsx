import { Studio } from '@/entities/studio';
import { SStudioOption } from './StudioOption.styled';
import React from 'react';

type StudioItemOption = {
  id: 'addr' | 'homepage' | 'parking' | 'convenience' | 'serviceCenter';
  icon: string;
};

const OPTION: StudioItemOption[] = [
  { id: 'addr', icon: 'location' },
  { id: 'homepage', icon: 'url' },
  { id: 'parking', icon: 'parking' },
  { id: 'convenience', icon: 'info' },
  { id: 'serviceCenter', icon: 'contact' },
];

type Props = {
  studio: Studio;
};

const StudioOption = ({ studio }: Props) => {
  return (
    <SStudioOption>
      <div className="obud-studio-option">
        {OPTION.map((item) => {
          let active = true;

          if (item.id === 'convenience') {
            if (studio.convenience.length === 0) active = false;
          }

          return (
            <div className={`obud-option-item ${active ? 'active' : ''}`} key={item?.id}>
              <div className="icons-container">
                <i className={`icons ${item?.icon}`} />
              </div>
              <OptionTextRender id={item?.id || ''} data={studio} />
            </div>
          );
        })}
      </div>
    </SStudioOption>
  );
};

type OptionProps = {
  id: StudioItemOption['id'];
  data: Studio;
};

const OptionTextRender = ({ id, data }: OptionProps) => {
  if (id === 'addr') {
    return `${data?.addr || ''} ${data?.addrDetail || ''}` as unknown as React.JSX.Element;
  }

  if (id === 'homepage') {
    // 홈페이지
    return (
      <a href={data?.homepage || ''} target="blank">
        {data?.homepage || ''}
      </a>
    );
  }

  if (id === 'parking') {
    // 주차 여부
    const check = data?.parking === 'true' ? '주차 가능' : '주차 불가능';

    return (
      <div className="option-deps">
        <p>{check}</p>
        {data?.parkingInfo && <p>{data.parkingInfo}</p>}
      </div>
    );
  }

  if (id === 'convenience') {
    return (
      <div className="option-deps">
        <p>편의시설</p>

        <div>
          {data?.convenience?.map((item: string) => (
            <span className="convenience-item" key={item}>
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (id === 'serviceCenter') {
    // 센터 정보
    return (
      <div className="option-deps">
        <p>{data?.serviceCenter}</p>
      </div>
    );
  }

  return null;
};

export default StudioOption;
