import { useContext, useEffect, useRef } from 'react';
import Link from 'next/link';

import '@egjs/flicking-plugins/dist/arrow.css';
import '@egjs/flicking-plugins/dist/pagination.css';
import Flicking, { ViewportSlot } from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking-inline.css';
import '@egjs/react-flicking/dist/flicking.css';

import { Arrow, AutoPlay, Pagination } from '@egjs/flicking-plugins';

import { LayoutContext } from '@/context/LayoutContext';
import { SSpecialList } from './SpecialList.styled';
import { SStudioItem } from './StudioItem.styled';
import CustomImage from '@components/common/image/CustomImage';

type Props = {
  id: string;
  url: string;
  img_url: string;
};

const TempBanner = () => {
  const { matchese } = useContext(LayoutContext);
  const flickingRef = useRef<Flicking>(null);

  const list: Props[] = [
    { id: '1', url: 'https://www.myrealtrip.com/offers/145475', img_url: 'special1.png' },
    { id: '2', url: 'https://www.obud.co/lesson/393841ac-2e08-45c3-b607-15d96ddb88b3', img_url: 'special2.png' },
  ];

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
                <SStudioItem>
                  <div className="studio-item-images-container">
                    <div className="studio-item-image">
                      <Link href={item.url}>
                        <a>
                          <CustomImage
                            className="studio-image-1"
                            src={`/img/${item.img_url}`}
                            width={800}
                            height={800}
                            alt="special-images"
                          />
                        </a>
                      </Link>
                    </div>
                  </div>
                </SStudioItem>
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

export default TempBanner;
