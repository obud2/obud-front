import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger } from '@/components/common/sheet/Sheet';
import SearchDate from '@/components/search/option/SearchDate';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export const CalendarModal = ({ children }) => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false);

    const onClickDate = (date) => {
        router.push({
            pathname: '/discover',
            query: {
                date,
            },
        });

        setModalOpen(false);
    };

  return (
    <Sheet open={modalOpen} onOpenChange={(e) => setModalOpen(e)}>
      <SheetTrigger onClick={() => setModalOpen(true)}>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetDescription>
            <SearchDate onClick={onClickDate} />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
