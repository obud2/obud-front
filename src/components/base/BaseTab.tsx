import React from 'react';
import { SBaseTab } from './BaseTab.styled';

const BaseTab = ({ tabs, value, onChange }: any) => {
  return (
    <SBaseTab>
      <ul className="base-tab-container">
        {tabs &&
          tabs?.length > 0 &&
          tabs?.map((a: any) => (
            <li
              key={`tab-item-${a?.title}`}
              className={`tab-item text-delay-animation ${`${a?.title}`.toLowerCase() === value || a?.id === value ? 'active' : ''}`}
              onClick={() => onChange(`${a?.title}`.toLowerCase(), a)}
            >
              {a?.title}
            </li>
          ))}
      </ul>
    </SBaseTab>
  );
};

export default BaseTab;
