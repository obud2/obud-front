import { useEffect } from 'react';

import { getVisitId, setVisitId } from 'src/constants';
import UserService from 'src/service/UserService';

const useVisit = () => {
  useEffect(() => {
    const log = getVisitId();

    if (log !== 'true') {
      UserService.visitUser().then(() => {
        const today = new Date();
        today.setDate(today.getDate() + 1);

        setVisitId(today);
      });
    }
  }, []);
};

export default useVisit;
