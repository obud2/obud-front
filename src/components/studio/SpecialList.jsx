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

import { SSpecialList } from './SpecialList.styled';
import StudioItem from './StudioItem';

const SpecialList = ({ list }) => {
  const { matchese } = useContext(LayoutContext);
  const [flicking, setFlicking] = useState([]);

  const plugins = [
    new Arrow(),
    new Pagination({ type: 'fraction' }),
    new AutoPlay({ duration: 6000, direction: 'NEXT', stopOnHover: false }),
  ];

  useEffect(() => {
    setFlicking(list);
  }, [list]);

  return (
    <SSpecialList isShow={list?.length > 0}>
      <p className="list-title">Special</p>

      <div className="specail-list">
        <div className="class-list-container">
          {flicking && flicking?.length > 0 && (
            <Flicking circular align="prev" panelsPerView={matchese ? 1 : 4} plugins={plugins}>
              {flicking?.map((item) => (
                <div className="panel" key={`panel_${item?.id}`}>
                  <StudioItem
                    key={item?.id}
                    id={item?.id || ''}
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
          )}
        </div>
      </div>
    </SSpecialList>
  );
};

export default SpecialList;
