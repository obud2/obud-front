import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/common/sheet/Sheet';
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
      <SheetContent>
        <SheetHeader>
          <SheetTitle>필터</SheetTitle>
          <SheetDescription>
            <div style={{ width: 540 }}>good</div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
