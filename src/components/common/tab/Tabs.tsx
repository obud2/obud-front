import React, { useState, ReactNode } from 'react';
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

  return (
    <STabs>
      <div className="tabs-container">
        <div className="tabs-header">
          {React.Children.map(children, (child: any, idx) => (
            <div key={idx} className="tab-wrapper">
              <div className={`tab ${activeKey === child.props.tab ? 'active' : ''}`} onClick={() => setActiveKey(child.props.tab)}>
                {child.props.tab}
              </div>
            </div>
          ))}
        </div>
        <div className="tabs-content">
          {React.Children.map(children, (child: any) => {
            if (child.props.tab === activeKey) {
              return child;
            }
            return null;
          })}
        </div>
      </div>
    </STabs>
  );
};
