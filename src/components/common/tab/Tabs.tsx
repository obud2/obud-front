import { StudioTabType } from '@/components/studio/detail/StudioDetail';
import { useRouter } from 'next/router';
import React, { ReactNode, useRef } from 'react';
import { STabs } from './Tabs.styled';

type TabPaneProps = {
  tab: StudioTabType;
  tabName: string; // displayName
  children: ReactNode;
};

export const TabPane = ({ children }: TabPaneProps) => {
  return <div>{children}</div>;
};

type TabsProps = {
  children: ReactNode[];
};

export const Tabs = ({ children }: TabsProps) => {
  const router = useRouter();
  const { query } = router;
  const activeKey = query.tab || 'home';

  const initialTabRef = useRef<HTMLDivElement | null>(null);

  const handleTabClick = (key: string) => {
    router.replace({ query: { ...query, tab: key } }, undefined, { shallow: true });
  };

  return (
    <STabs>
      <div className="tabs-container">
        <div className="tabs-header">
          {React.Children.map(children, (child: any, idx) => (
            <div
              key={idx}
              ref={child.props.tab === activeKey ? initialTabRef : null}
              className={`tab-wrapper ${activeKey === child.props.tab ? 'active' : ''}`}
              onClick={() => handleTabClick(child.props.tab)}
            >
              {child.props.tabName}
            </div>
          ))}
        </div>
        <div className="tabs-content">
          {React.Children.map(children, (child: any, idx: number) => (
            <div key={idx} className={activeKey === child.props.tab ? 'visible-tab' : 'hidden-tab'}>
              {child}
            </div>
          ))}
        </div>
      </div>
    </STabs>
  );
};
