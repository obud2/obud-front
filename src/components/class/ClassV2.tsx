import Chip from '@/components/common/chip/Chip';
import { Studio, StudioSection } from '@/entities/studio';
import SpecialList from '../studio/SpecialList';
import { SClass } from './ClassV2.styled';
import Flicking from '@egjs/react-flicking';
import { useRef } from 'react';
import SectionStudioItem from './SectionStudioItem';
import { useRouter } from 'next/router';

type Props = {
  specialStudios: Studio[];
  sectionedStudios: StudioSection[];
};

const ClassV2 = ({ specialStudios, sectionedStudios }: Props) => {
  const router = useRouter();
  const flickingRef = useRef<Flicking>(null);

  return (
    <SClass>
      <article className="obud-class-article">
        <section className="class-container">
          <SpecialList list={specialStudios} />
        </section>

        <section className="class-category">
          <Chip label="요가" onClick={() => router.push('/class/category/1')} />
          <Chip label="차" onClick={() => router.push('/class/category/2')} />
          <Chip label="명상" onClick={() => router.push('/class/category/3')} />
          <Chip label="기타" onClick={() => router.push('/class/category/4')} />
        </section>

        {sectionedStudios.map((section) => (
          <section key={section.id} className="class-section-container">
            <div className="section-title-container">
              <div className="section-title">{section.name}</div>
              <div className="section-more">전체보기</div>
            </div>

            <div className="section-studio-container">
              <Flicking ref={flickingRef} circular align="prev">
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
        ))}
      </article>
    </SClass>
  );
};

export default ClassV2;
