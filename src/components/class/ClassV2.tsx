import Chip from '@/components/common/chip/Chip';
import { SectionWithItems, Studio } from '@/entities/studio';
import { useRouter } from 'next/router';
import SpecialList from '../studio/SpecialList';
import { SClass } from './ClassV2.styled';
import SectionItem from './SectionItem';

type Props = {
  specialStudios: Studio[];
  sectionWithItems: SectionWithItems[];
};

const ClassV2 = ({ specialStudios, sectionWithItems }: Props) => {
  const router = useRouter();

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

        {sectionWithItems.map((swi) => (
          <SectionItem key={swi.section.id} sectionWithItems={swi} />
        ))}
      </article>
    </SClass>
  );
};

export default ClassV2;
