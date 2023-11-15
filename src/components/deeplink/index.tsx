import { APP_URL } from '@/constants';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const DEEP_LINK_SCHEME = 'obud://home';

// client side only
const DeepLink = () => {
  const router = useRouter();
  const { path } = router.query;

  useEffect(() => {
    const userAgent = navigator.userAgent;
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      window.location.href = `${DEEP_LINK_SCHEME}/${path ?? ''}`;
      setTimeout(() => {
        window.location.href = 'https://apps.apple.com/kr/app/obud/id6459364190';
      }, 1000);
    } else if (/android/i.test(userAgent)) {
      window.location.href = `${DEEP_LINK_SCHEME}/${path ?? ''}`;
      setTimeout(() => {
        window.location.href = 'https://play.google.com/store/apps/details?id=co.obud';
      }, 1000);
    } else {
      window.location.href = `${APP_URL}/${path ?? ''}`;
    }
  }, [path]);

  return <div></div>;
};

export default DeepLink;
