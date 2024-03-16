import CustomButton from '@/components/common/button/CustomButton';
import { Separator } from '@/components/common/separator/Separator';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTrigger } from '@/components/common/sheet/Sheet';
import { FilterBox } from '@/components/discover/filter-modal/filter-box/FilterBox';
import { FilterProgram } from '@/components/discover/filter-modal/filter-box/FilterProgram';
import { FilterSlider } from '@/components/discover/filter-modal/filter-box/FilterSlider';
import React, { useState } from 'react';

export const FilterModal = ({ children }) => {
    // const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false);

    // const onClickDate = (date) => {
    //     router.push({
    //         pathname: '/discover',
    //         query: {
    //             date,
    //         },
    //     });

    //     setModalOpen(false);
    // };

  return (
    <Sheet open={modalOpen} onOpenChange={(e) => setModalOpen(e)}>
      <SheetTrigger onClick={() => setModalOpen(true)} asChild>{children}</SheetTrigger>
      <SheetContent style={{
        bottom: 55,
      }}
      >
        <SheetHeader>
          <SheetDescription>
            <div style={{ textAlign: 'left' }}>
              <FilterBox title="프로그램">
                <FilterProgram />
              </FilterBox>
              <Separator />
              <FilterBox title="시작 시간">
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
            <CustomButton style={{ padding: '0 20px' }} borderRadius="20px" onClick={() => { console.log('123)'); }}>
              <span>적용</span>
            </CustomButton>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
