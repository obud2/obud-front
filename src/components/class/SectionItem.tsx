import { LayoutContext } from '@/context/LayoutContext';
import { StudioSection } from '@/entities/studio';
import Flicking from '@egjs/react-flicking';
import router from 'next/router';
import { useContext, useRef } from 'react';
import SectionStudioItem from './SectionStudioItem';

type Props = {
  section: StudioSection;
};

const SectionItem = ({ section }: Props) => {
  const { matchese } = useContext(LayoutContext);
  const flickingRef = useRef<Flicking>(null);

  return (
    <section key={section.id} className="class-section-container">
      <div className="section-title-container">
        <div className="section-title">{section.name}</div>
        <div className="section-more" onClick={() => router.push(`/class/section/${section.id}`)}>
          전체보기
        </div>
      </div>

      <div className="section-studio-container">
        <Flicking ref={flickingRef} circular align="prev" panelsPerView={matchese ? 2.2 : 4} gap={-20}>
          {section.studios.map((studio) => (
            <div className="panel section-studio-item" key={studio.id}>
              <SectionStudioItem
                id={studio.id}
                images={studio.images}
                title={studio.title}
                category={studio.category}
                lessonType=""
                addr={studio.addr}
              />
            </div>
          ))}
        </Flicking>
      </div>
    </section>
  );
};

export default SectionItem;
