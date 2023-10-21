import { StudioTabType } from '@/components/studio/detail/StudioDetail';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
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

  const [highlightWidth, setHighlightWidth] = useState(0);
  const [highlightLeft, setHighlightLeft] = useState(0);

  const initialTabRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (initialTabRef.current) {
      setHighlightWidth(initialTabRef.current.offsetWidth);
      setHighlightLeft(initialTabRef.current.offsetLeft);
    }
  }, []);

  const handleTabClick = (key: string, event: React.MouseEvent) => {
    router.replace({ query: { ...query, tab: key } }, undefined, { shallow: true });
    const target = event.currentTarget as HTMLElement;
    setHighlightWidth(target.offsetWidth);
    setHighlightLeft(target.offsetLeft);
  };

  return (
    <STabs>
      <div className="tabs-container">
        <div className="tabs-header">
          <div className="tabs-highlight" style={{ width: highlightWidth, left: highlightLeft }}></div>
          {React.Children.map(children, (child: any, idx) => (
            <div key={idx} className="tab-wrapper">
              <div
                ref={child.props.tab === activeKey ? initialTabRef : null}
                className={`tab ${activeKey === child.props.tab ? 'active' : ''}`}
                onClick={(e) => handleTabClick(child.props.tab, e)}
              >
                {child.props.tabName}
              </div>
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
