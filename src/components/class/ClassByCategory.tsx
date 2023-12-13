import { Studio } from '@/entities/studio';
import StudioList from '../studio/StudioList';
import { SClass } from './Class.styled';

type Props = {
  studios: Studio[];
};

const ClassByCategory = ({ studios }: Props) => {
  return (
    <SClass>
      <article className="obud-class-article">
        <section className="class-container">
          <StudioList list={studios} />
        </section>
      </article>
    </SClass>
  );
};

export default ClassByCategory;
