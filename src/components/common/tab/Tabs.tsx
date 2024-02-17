import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { STabs } from './Tabs.styled';
import { useRouter } from 'next/router';

type TabPaneProps = {
  tab: string;
  tabName: string; // displayName
  children: ReactNode;
};

export const TabPane = ({ children }: TabPaneProps) => {
  return <div>{children}</div>;
};

type TabsProps = {
  children: ReactNode[];
  defaultTab?: string;
};

export const Tabs = ({ children, defaultTab }: TabsProps) => {
  const router = useRouter();
  const { query } = router;

  const [activeKey, setActiveKey] = useState(query.tab || defaultTab || 'home');
  const initialTabRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (query.tab) {
      setActiveKey(query.tab as string);
    }
  }, [query.tab]);

  const handleTabClick = (key: string) => {
    setActiveKey(key);
    router.push({ query: { ...query, tab: key } });
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
