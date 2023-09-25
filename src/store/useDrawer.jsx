import { create } from 'zustand';

import { devtools } from 'zustand/middleware';

const useDrawer = create(
  devtools((set) => ({
    isOpen: false,

    onClickOpenDrawer: () => {
      set({
        isOpen: true,
      });
    },

    onClickCloseDrawer: () => {
      set({
        isOpen: false,
      });
    },
  })),
);
export default useDrawer;
