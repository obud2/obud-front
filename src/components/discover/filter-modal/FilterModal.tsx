import CustomButton from '@/components/common/button/CustomButton';
import { Separator } from '@/components/common/separator/Separator';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/common/sheet/Sheet';
import { useFilter } from '@/components/discover/filter-modal/FilterContext';
import { FilterTabs } from '@/components/discover/filter-modal/FilterTabs';
import { FilterBox } from '@/components/discover/filter-modal/filter-box/FilterBox';
import { FilterProgram } from '@/components/discover/filter-modal/filter-box/FilterProgram';
import { FilterRegion } from '@/components/discover/filter-modal/filter-box/FilterRegion';
import { FilterSlider } from '@/components/discover/filter-modal/filter-box/FilterSlider';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export const FilterModal = ({ children }) => {
  const router = useRouter();

  const { regions, programs, time } = useFilter();
  const [modalOpen, setModalOpen] = useState(false);

  const setQuery = () => {
    let query = '';

    if (time) {
      query += `startTime=${time[0]}&endTime=${time[1]}`;
    }

    if (regions.length) {
      regions.forEach((region) => {
        query += `&region=${region}`;
      });
    }

    if (programs.length) {
      programs.forEach((program) => {
        query += `&categoryIds=${program}`;
      });
    }
      router.push(`${router.pathname}?${query}`);
      setModalOpen(false);
  };
  return (
    <Sheet open={modalOpen} onOpenChange={(e) => setModalOpen(e)}>
      <SheetTrigger onClick={() => setModalOpen(true)} asChild>{children}</SheetTrigger>
      <SheetContent style={{
        bottom: 55,
      }}
      >
        <SheetHeader>
          <SheetTitle>필터</SheetTitle>
          <FilterTabs />
          <SheetDescription>
            <div style={{ textAlign: 'left', paddingBottom: 330, overflow: 'auto', height: 300 }}>

              <FilterBox title="지역" id="filter-region">
                <FilterRegion />
              </FilterBox>
              <Separator />

              <FilterBox title="프로그램" id="filter-program">
                <FilterProgram />
              </FilterBox>
              <Separator />

              <FilterBox title="시작 시간" id="filter-time">
                <FilterSlider />
              </FilterBox>

            </div>
          </SheetDescription>
        </SheetHeader>
        <div style={{
            marginTop: '17px',
            marginBottom: '15px',
          }}
        >
          <Separator />
        </div>
        <SheetFooter>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px' }}>
            <CustomButton style={{ padding: '0 20px' }} borderRadius="20px" variant="outlined" onClick={() => { console.log('123)'); }}>
              <span>초기화</span>
            </CustomButton>
            <CustomButton style={{ padding: '0 20px' }} borderRadius="20px" onClick={setQuery}>
              <span>적용</span>
            </CustomButton>
          </div>
        </SheetFooter>

      </SheetContent>
    </Sheet>
  );
};
