import { useContext, useEffect, useState } from 'react';

import Flicking, { ViewportSlot } from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/react-flicking/dist/flicking-inline.css';
import '@egjs/flicking-plugins/dist/arrow.css';
import '@egjs/flicking-plugins/dist/pagination.css';

import { AutoPlay } from '@egjs/flicking-plugins';
import { Pagination } from '@egjs/flicking-plugins';
import { Arrow } from '@egjs/flicking-plugins';

import { LayoutContext } from 'src/context/LayoutContext';

import { SStudioDetailList } from './StudioDetailList.styled';
import { ObudImage, Studio } from '@/entities/studio';
import StudioDetailItem from './StudioDetailItem';

type Props = {
  studio: Studio;
};

const StudioDetailList = ({ studio }: Props) => {
  const { matchese } = useContext(LayoutContext);
  const [flicking, setFlicking] = useState<ObudImage[]>([]);

  const plugins = [
    new Arrow(),
    new Pagination({ type: 'fraction' }),
    new AutoPlay({ duration: 6000, direction: 'NEXT', stopOnHover: false }),
  ];

  useEffect(() => {
    setFlicking(studio.images);
  }, [studio.images]);

  return (
    <SStudioDetailList isShow>
      <div className="studio-detail-list">
        <div className="class-list-container">
          {flicking && flicking?.length > 0 && (
            <Flicking circular align="prev" panelsPerView={matchese ? 1 : 4} plugins={plugins}>
              {flicking.map((image: ObudImage) => (
                <div className="panel" key={`panel_${image.key}`}>
                  <StudioDetailItem key={image.key} image={image} />
                </div>
              ))}

              <ViewportSlot>
                <div className="filcking-arrow-container">
                  <span className="flicking-arrow-prev"></span>
                  <span className="flicking-arrow-next"></span>
                </div>
                <div className="flicking-pagination" />
              </ViewportSlot>
            </Flicking>
          )}
        </div>
      </div>
    </SStudioDetailList>
  );
};

export default StudioDetailList;
