import React from 'react';

import Link from 'next/link';
import { IMG_PATH } from 'src/constants';

import { SErorr } from './Erorr.styled';
import CustomImage from '@components/common/image/CustomImage';

const Erorr = () => {
  return (
    <SErorr>
      <article className="error-container">
        <section className="error-text-container">
          <h1>404</h1>
          <h3>Page Not Found</h3>

          <p>The page you visited has an invalid or deleted address.</p>
          <p>방문하신 페이지의 주소가 잘못되었거나 삭제된 페이지입니다.</p>

          <Link href="/">홈으로 돌아가기</Link>
        </section>

        <section className="error-img-container">
          <CustomImage src={`${IMG_PATH}/obud_logo_move.gif`} width={300} height={300} />
        </section>
      </article>
    </SErorr>
  );
};

export default Erorr;
