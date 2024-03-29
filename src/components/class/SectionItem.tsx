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
          <span>전체보기</span>
          <div className="arrow-icon"></div>
        </div>
      </div>

      <div className="section-studio-container">
        <Flicking ref={flickingRef} align="prev" panelsPerView={matchese ? 2.2 : 4} gap={-20} moveType="snap">
          {items.map((studio) => (
            <div className="panel section-studio-item" key={studio.id}>
              <SectionStudioItem studio={studio} />
            </div>
          ))}
        </Flicking>
      </div>
    </section>
  );
};

export default SectionItem;
