import { useContext, useEffect, useRef } from 'react';

import '@egjs/flicking-plugins/dist/arrow.css';
import '@egjs/flicking-plugins/dist/pagination.css';
import Flicking, { ViewportSlot } from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking-inline.css';
import '@egjs/react-flicking/dist/flicking.css';

import { Arrow, AutoPlay, Pagination } from '@egjs/flicking-plugins';

import { LayoutContext } from '@/context/LayoutContext';
import { Studio } from '@/entities/studio';
import { SSpecialList } from './SpecialList.styled';
import StudioItem from './StudioItem';

const SpecialList = ({ list }: { list: Studio[] }) => {
  const { matchese } = useContext(LayoutContext);
  const flickingRef = useRef<Flicking>(null);

  useEffect(() => {
    if (flickingRef.current) {
      const plugins = [new Arrow(), new Pagination({ type: 'fraction' }), new AutoPlay({ duration: 6000, direction: 'NEXT' })];
      flickingRef.current.addPlugins(...plugins);
    }
  }, []);

  return (
    <SSpecialList isShow={list.length > 0}>
      <p className="list-title">Special</p>
      <div className="special-list">
        <div className="class-list-container">
          <Flicking ref={flickingRef} circular align="prev" panelsPerView={matchese ? 1 : 4}>
            {list.map((item: any) => (
              <div className="panel" key={`panel_${item.id}`}>
                <StudioItem
                  id={item?.id || ''}
                  key={item.id}
                  images={item?.images || []}
                  title={item?.title || ''}
                  category={item?.category || ''}
                  lessonType={item?.lessonType || ''}
                  addr={item?.addr || ''}
                />
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
        </div>
      </div>
    </SSpecialList>
  );
};

export default SpecialList;
