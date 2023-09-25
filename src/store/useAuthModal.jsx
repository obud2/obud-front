import { create } from 'zustand';

import { devtools } from 'zustand/middleware';

const useAuthModal = create(
  devtools((set) => ({
    auth: {
      isOpen: false,
      type: '',
    },

    onClickOpenAuth: (type) => {
      set({
        auth: {
          isOpen: true,
          type,
        },
      });
    },

    onClickCloseAuth: () => {
      set({
        auth: {
          isOpen: false,
          type: '',
        },
      });
    },
  })),
);
export default useAuthModal;
