import React, { useState, ReactNode, useEffect, useRef } from 'react';
import { STabs } from './Tabs.styled';

type TabPaneProps = {
  tab: string;
  children: ReactNode;
};

export const TabPane = ({ children }: TabPaneProps) => {
  return <div>{children}</div>;
};

type TabsProps = {
  defaultActiveKey?: string;
  children: ReactNode[];
};

export const Tabs = ({ defaultActiveKey, children }: TabsProps) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey || '');
  const [highlightWidth, setHighlightWidth] = useState(0);
  const [highlightLeft, setHighlightLeft] = useState(0);

  const firstTabRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (firstTabRef.current) {
      setHighlightWidth(firstTabRef.current.offsetWidth);
      setHighlightLeft(firstTabRef.current.offsetLeft);
    }
  }, []);

  const handleTabClick = (key: string, event: React.MouseEvent) => {
    setActiveKey(key);
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
                ref={idx === 0 ? firstTabRef : null}
                className={`tab ${activeKey === child.props.tab ? 'active' : ''}`}
                onClick={(e) => handleTabClick(child.props.tab, e)}
              >
                {child.props.tab}
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
