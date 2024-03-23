import React from 'react';

export const FilterBox = ({ title, children, id }) => {
  return (
    <div style={{ padding: '28px 8px' }} id={id}>
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
