import React from 'react';

import { SProductPolicy } from './ProductPolicy.styled';

const ProductPolicy = ({ info, policy }) => {
  return (
    <SProductPolicy>
      <PolicyContainer title="이용 안내" contents={info || ''} />

      <PolicyContainer title="환불 규정" contents={policy || ''} />
    </SProductPolicy>
  );
};

const PolicyContainer = ({ title, contents }) => {
  return (
    contents && (
      <div className="product-policy-container">
        <p className="product-policy-title">
          {/* <i className="icons info" /> */}
          {title}
        </p>

        <div className="product-policy-contents">{contents || '-'}</div>
      </div>
    )
  );
};

export default ProductPolicy;
