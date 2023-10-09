import ProductImages from '@/components/studio/detail/images/ProductImages';
import ProductPolicy from '@/components/studio/detail/policy/ProductPolicy';
import { Lesson } from '@/entities/lesson';
import { SLesson } from './LessonDetail.styled';
import LessonOption from './option/LessonOption';
import LessonReservation from './option/LessonReservation';

type Props = {
  lesson: Lesson;
};

const LessonDetail = ({ lesson }: Props) => {
  return (
    <SLesson>
      <section className="obud-lesson-detail-option-container">
        <div className="obud-images-container">
          <ProductImages images={lesson?.images || []} />
        </div>

        <div className="obud-option-container">
          <LessonOption shareHide={false} data={lesson || {}} />
        </div>
      </section>

      {/* 예약하기 버튼 */}
      <LessonReservation data={lesson} />

      <section className="obud-line" />
      <section className="obud-lesson-detail-contents-container" dangerouslySetInnerHTML={{ __html: lesson?.contents || '' }} />
      <section className="obud-lesson-policy">
        <ProductPolicy info={lesson?.studios?.information || ''} policy={lesson?.studios?.refundPolicy || ''} />
      </section>
    </SLesson>
  );
};

export default LessonDetail;
