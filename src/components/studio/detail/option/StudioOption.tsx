import { Studio } from '@/entities/studio';
import { SStudioOption } from './StudioOption.styled';

const OPTION = [
  { id: 'addr', icon: 'location' },
  { id: 'homepage', icon: 'url' },
  { id: 'parking', icon: 'parking' },
  { id: 'convenience', icon: 'info' },
  { id: 'serviceCenter', icon: 'home' },
];

type Props = {
  studio: Studio;
};

const StudioOption = ({ studio }: Props) => {
  return (
    <SStudioOption>
      <div className="obud-studio-option">
        {OPTION?.map((item) => {
          let active = false;

          if (item?.id === 'parking') active = true;
          if (item?.id === 'convenience') {
            if (studio?.convenience?.length > 0) active = true;
            else active = false;
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

export const OptionTextRender = ({ id, data }: any) => {
  if (id === 'addr') {
    return <p>{data?.addr || ''}</p>;
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
        <p>{data?.parkingInfo || ''}</p>
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
        <p>센터 정보</p>
        <p>{data?.serviceCenter}</p>
      </div>
    );
  }

  return null;
};

export default StudioOption;