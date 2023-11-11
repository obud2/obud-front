import dynamic from 'next/dynamic';

const DeepLink = dynamic(() => import('@/components/deeplink'), { ssr: false });

const Index = () => {
  return (
    <div>
      <DeepLink />
    </div>
  );
};

export default Index;
