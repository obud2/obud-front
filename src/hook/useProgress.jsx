import { useEffect } from 'react';
import { Router } from 'next/router';

const useProgress = () => {
  useEffect(() => {
    const start = () => {
      const ele = document.querySelector('.loader');

      ele?.classList?.add('loader-progress');
    };

    const end = () => {
      const ele = document.querySelector('.loader');

      ele?.classList?.add('loader-progress-complete');

      setTimeout(() => {
        ele?.classList.remove('loader-progress');
        ele?.classList.remove('loader-progress-complete');
      }, [300]);
    };

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);
};

export default useProgress;
