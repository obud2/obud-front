import ProductImages from '@/components/studio/detail/images/ProductImages';
import ProductPolicy from '@/components/studio/detail/policy/ProductPolicy';
import { Lesson } from '@/entities/lesson';
import Share from '../option/Share';
import { SLesson } from './LessonDetail.styled';
import LessonDetailList from './LessonDetailList';
import { SLessonOption } from './option/LessonOption.styled';
import LessonReservation from './option/LessonReservation';

type Props = {
  lesson: Lesson;
};

const LessonDetail = ({ lesson }: Props) => {
  return (
    <SLesson>
      <section className="obud-lesson-detail-option-container">
        <div className="obud-images-container">
          <div className="lesson-detail-list">
            <LessonDetailList lesson={lesson} />
          </div>
          <div className="product-images">
            <ProductImages images={lesson?.images || []} />
          </div>
        </div>

        <SLessonOption>
          <div className="obud-lesson-header">
            <h4 className="obud-lesson-title">{lesson?.title || ''}</h4>
            <h5 className="obud-lesson-subtitle">{lesson?.studios?.title || ''}</h5>
            <div className="obud-lesson-icons">
              <Share data={lesson} title={lesson?.title || ''} isHide={false} />
            </div>
          </div>
        </SLessonOption>
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
