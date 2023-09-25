import React, { useContext } from 'react';

import { LayoutContext } from 'src/context/LayoutContext';

import Flicking, { ViewportSlot } from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/react-flicking/dist/flicking-inline.css';

import { AutoPlay } from '@egjs/flicking-plugins';
import { Pagination } from '@egjs/flicking-plugins';
import '@egjs/flicking-plugins/dist/pagination.css';

import { SAboutBanner } from './AboutBanner.styled';
import CustomImage from '@components/common/image/CustomImage';

const AboutBanner = ({ banner }) => {
  const { matchese } = useContext(LayoutContext);

  const plugins = [new AutoPlay({ duration: 8000, direction: 'NEXT', stopOnHover: false }), new Pagination({ type: 'scroll' })];

  return (
    <SAboutBanner>
      {banner && banner?.length > 0 && (
        <Flicking circular align="prev" plugins={plugins} panelsPerView={matchese ? 2 : 3}>
          {banner?.map((panel) => (
            <div className="panel" key={`panel_${panel?.name}`}>
              <CustomImage src={panel?.url || ''} layout="fill" />
            </div>
          ))}

          <ViewportSlot>
            <div className="flicking-pagination"></div>
          </ViewportSlot>
        </Flicking>
      )}
    </SAboutBanner>
  );
};

export default AboutBanner;
