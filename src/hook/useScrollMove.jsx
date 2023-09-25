import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { throttle } from 'lodash';

/**
 *
 * 스크롤을 유지하고 싶은 페이지에 추가 하여 사용.
 * 보통 리스트나 메인 페이지에 추가.
 */
const useScrollMove = () => {
  const router = useRouter();

  const [onMove, setOnMove] = useState(false);

  // 라우터상 페이지 스크롤 저장 로직
  const listener = useMemo(
    () =>
      throttle(() => {
        if (onMove) return;
        if (typeof window === undefined) return;

        const PATH = router?.asPath;
        const storagePages = JSON.parse(sessionStorage.getItem('scroll-retained-pages'));

        const pages = { ...storagePages };
        pages[PATH] = { scrollX: window.scrollX, scrollY: window.scrollY, timeout: 100 };

        sessionStorage.setItem('scroll-retained-pages', JSON.stringify(pages));
      }, [300]),
    [router, onMove],
  );

  // 이벤트 추가
  useEffect(() => {
    // Scroll Action
    if (typeof window !== undefined) {
      window.addEventListener('scroll', listener);

      return () => {
        window.removeEventListener('scroll', listener);
      };
    }
  }, [listener]);

  // 라우팅 체크
  useEffect(() => {
    if (typeof window !== undefined) {
      router.events.on('routeChangeStart', async () => {
        await setOnMove(true);
      });

      router.events.on('routeChangeComplete', async (props) => {
        const PATH = router?.asPath;
        const storagePages = JSON.parse(sessionStorage.getItem('scroll-retained-pages'));

        if (storagePages && props === PATH && storagePages[PATH]) {
          const { scrollX, scrollY } = storagePages[PATH];

          window.scrollTo(scrollX, scrollY);
        }

        await setOnMove(false);
      });
    }
  }, [router]);
};

export default useScrollMove;
