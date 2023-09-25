import React from 'react';

import { SClass } from './Class.styled';

import StudioList from '@components/studio/StudioList';
import SpecialList from '@components/studio/SpecialList';

const Class = ({ studios }) => {
  return (
    <SClass>
      <article className="obud-class-article">
        <section className="class-container">
          <SpecialList list={studios[0] || []} />
        </section>

        <section className="class-container">
          <StudioList title="New Class" list={studios[1] || []} />
        </section>

        <section className="class-container">
          <StudioList title="All Class" list={studios[2] || []} isSort />
        </section>
      </article>
    </SClass>
  );
};

export default Class;
