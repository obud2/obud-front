import { create } from 'zustand';

import { devtools } from 'zustand/middleware';

const useProfileStep = create(
  devtools((set) => ({
    isStep: 1,

    onStepChange: (step) => {
      set({
        isStep: step,
      });
    },
  })),
);
export default useProfileStep;
