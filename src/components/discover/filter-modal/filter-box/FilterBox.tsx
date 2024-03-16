import React from 'react';

export const FilterBox = ({ title, children }) => {
  return (
    <div style={{ padding: '32px 16px' }}>
      <div style={{
        fontSize: '14px', lineHeight: '16.41px', fontWeight: 700, paddingBottom: 18,
      }}
      >
        {title}
      </div>
      {children}
    </div>
  );
};
