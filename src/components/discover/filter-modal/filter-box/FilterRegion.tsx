import { useFilter } from '@/components/discover/filter-modal/FilterContext';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export const RegionValueMap = [{
    value: '서울',
    text: '서울',
    subRegion: [
        {
            value: '강남/서초',
            text: '강남/서초',
        },
        {
            value: '송파/강동',
            text: '송파/강동',
        },
        {
            value: '강북',
            text: '강북',
        },
        {
            value: '강서/양천',
            text: '강서/양천',
        },
        {
            value: '동작/관악/금천',
            text: '동작/관악/금천',
        },
        {
            value: '성동/광진',
            text: '성동/광진',
        },
        {
            value: '영등포/구로',
            text: '영등포/구로',
        },
        {
            value: '동대문/성북',
            text: '동대문/성북',
        },
        {
            value: '마포/서대문/은평',
            text: '마포/서대문/은평',
        },
        {
            value: '용산',
            text: '용산',
        },
        {
            value: '종로/중구',
            text: '종로/중구',
        },
    ],
}, {
    value: '경기',
    text: '경기',
    subRegion: [
        {
            value: '경기',
            text: '경기',
        },
    ],
}, {
    value: '제주',
    text: '제주',
    subRegion: [
        {
            value: '제주',
            text: '제주',
        },
    ],
}, {
    value: '강원',
    text: '강원',
    subRegion: [
        {
            value: '강원',
            text: '강원',
        },
    ],
}, {
    value: '부산/대구',
    text: '부산/대구',
    subRegion: [
        {
            value: '부산/대구',
            text: '부산/대구',
        },
    ],
}];

export const FilterRegion = () => {
    const [openSubRegion, setOpenSubRegion] = useState<string | undefined>();

    const handleRegionClick = (value) => {
        if (openSubRegion === value) {
            setOpenSubRegion(undefined);
        } else {
            setOpenSubRegion(value);
        }
    };

    const subRegion = RegionValueMap.find((region) => region.value === openSubRegion)?.subRegion;
    return (
      <>
        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        paddingBottom: '10px',
      }}
        >
          {
            RegionValueMap.map((region) => {
                return (
                  <SRegionButton key={region.value} onClick={() => handleRegionClick(region.value)}>
                    {region.text}
                  </SRegionButton>
                );
            })
        }

        </div>
        {openSubRegion && <FilterRegionSub subRegion={subRegion} />}
      </>
    );
};

const SRegionButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 46px;
    border: 1px solid #222222;
    background-color: transparent;
    padding: 8px 16px;
    color: #222222;
    font-size: 10px;
    font-weight: 700;
    white-space: nowrap;

    &.active {
        background-color: #4E5C4F;
        color: white;
    }
`;

const FilterRegionSub = ({ subRegion }: {subRegion: any}) => {
    const { regions, setRegions } = useFilter();
    // const [tempRegions, setTempRegions] = useState(regions);

    useEffect(() => {
        setRegions(regions);
    }, [regions]);

    const handleSubRegionClick = (value) => {
        const items = [...regions];

        if (items.includes(value)) {
            setRegions(items.filter((item) => item !== value));
        } else {
            setRegions([...items, value]);
        }
    };

    return (
      <div style={{
            width: '100%',
            background: '#E5E5E5',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '4px',
            padding: '16px 16px',
        }}
      >
        {
            subRegion.map((sub) => {
                const isActive = regions.includes(sub.value);

                return (
                  <SRegionButton key={sub.text + sub.value} onClick={() => handleSubRegionClick(sub.value)} className={isActive ? 'active' : ''}>
                    {sub.text}
                  </SRegionButton>
                );
            })
        }
      </div>
    );
};
