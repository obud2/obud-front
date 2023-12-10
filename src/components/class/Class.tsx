import StudioList from '@/components/studio/StudioList';
import { Studio } from '@/entities/studio';
import dynamic from 'next/dynamic';
import { SClass } from './Class.styled';

const SpecialList = dynamic(() => import('@/components/studio/SpecialList'), { ssr: false });

type Props = {
  studios: Studio[][];
};

const Class = ({ studios }: Props) => {
  return (
    <SClass>
      <article className="obud-class-article">
        <section className="class-container">
          <SpecialList list={studios[0] || []} />
        </section>

        {/* new class, old class 나누는거 잠시 원복하고 모든 클래스 우선 보여주기 */}

        {/* <section className="class-container">
          <StudioList isSort={false} title="New Class" list={studios[1] || []} />
        </section> */}

        <section className="class-container">
          <StudioList title="All Place" list={studios[1] || []} isSort />
        </section>
      </article>
    </SClass>
  );
};

export default Class;
