import { LayoutContext } from '@/context/LayoutContext';
import { SectionWithItems } from '@/entities/studio';
import Flicking from '@egjs/react-flicking';
import router from 'next/router';
import { useContext, useRef } from 'react';
import SectionStudioItem from './SectionStudioItem';

type Props = {
  sectionWithItems: SectionWithItems;
};

const SectionItem = ({ sectionWithItems }: Props) => {
  const { matchese } = useContext(LayoutContext);
  const flickingRef = useRef<Flicking>(null);

  const { section, items } = sectionWithItems;

  return (
    <section key={section.id} className="class-section-container">
      <div className="section-title-container">
        <div className="section-title">{section.name}</div>
        <div className="section-more" onClick={() => router.push(`/class/section/${section.id}`)}>
          전체보기
        </div>
      </div>

      <div className="section-studio-container">
        <Flicking ref={flickingRef} circular align="prev" panelsPerView={matchese ? 2.2 : 4} gap={-20} moveType="freeScroll">
          {items.map((studio) => (
            <div className="panel section-studio-item" key={studio.id}>
              <SectionStudioItem
                id={studio.id}
                images={studio.images}
                title={studio.name}
                category=""
                lessonType=""
                addr={studio.address ?? studio.addr ?? ''}
              />
            </div>
          ))}
        </Flicking>
      </div>
    </section>
  );
};

export default SectionItem;
