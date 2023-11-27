import Error from '@components/error/Error';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const NotFoundPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/class');
  }, []);

  return <Error />;
};

export default NotFoundPage;
