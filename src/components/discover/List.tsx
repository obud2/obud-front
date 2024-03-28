import CustomImage from '@/components/common/image/CustomImage';
import { DisplayType, useMap } from '@/context/MapContext';
import Link from 'next/link';
import styled from 'styled-components';

export const List = () => {
    const { places, setType, reset } = useMap();
    return (

      <div
        style={{
            flex: 1,
            width: 380,
            overflow: 'auto',
        }}
      >
        <SList>{places.map((place) => {
        const images = place?.images ? JSON.parse(place.images) : [];
        const image = images?.[0]?.url || '';

        const category = place?.category ? JSON.parse(place.category) : [];

        return (
          <div key={place.id}>
            <div className="devider" />
            <Link href={`/class/${place.id}`}>
              <div className="wrap">
                {image && <CustomImage src={image} width={70} height={70} />}
                <div className="discription">
                  <div className="obud-place-option">
                    <div>{category.join(',')}</div>|
                    <div>{place.region}</div>
                  </div>
                  <div className="obud-place-title">{place.title}</div>
                </div>
              </div>
            </Link>
          </div>
);
      })}

          <div className="show-map" onClick={() => { setType(DisplayType.MAP); reset(); }}>지도로 보기</div>
        </SList>
      </div>
);
};

const SList = styled.div`
    position: relative;
    width: 380px;
    height: 100%;
    .devider {
        height: 6px;
        background-color: #EEEFF1;
    }

    .wrap {
        display: flex;
        padding: 23px;
        gap: 10px
    }

    .discription {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .show-map {
        position: fixed;
        display: flex;
        background-color: #344235;
        border-radius: 15px;
        gap: 6px;
        width: 134px;
        height: 33px;
        justify-content: center;
        align-items: center;
        transform: translateX(-50%);
        z-index: 40;
        left: 50%;
        bottom: 20px;
        color: #ffffff;
        font-size: 13px;
    }
`;
