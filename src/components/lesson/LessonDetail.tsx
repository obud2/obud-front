import ProductImages from '@/components/studio/detail/images/ProductImages';
import ProductPolicy from '@/components/studio/detail/policy/ProductPolicy';
import { Lesson } from '@/entities/lesson';
import Share from '../option/Share';
import { SLesson } from './LessonDetail.styled';
import LessonDetailList from './LessonDetailList';
import { SLessonOption } from './option/LessonOption.styled';
import { useRouter } from 'next/router';
import { Tabs, TabPane } from '../common/tab/Tabs';
import { Studio } from '@/entities/studio';
import { useQuery } from 'react-query';
import { getStudio } from '@/service/StudioService';
import CustomImage from '../common/image/CustomImage';

type Props = {
  lesson: Lesson;
};

const enum TabType {
  RESERVATION = '예약하기',
  DETAIL = '상세정보',
}

const LessonDetail = ({ lesson }: Props) => {
  const router = useRouter();

  const { data: studio } = useStudio(lesson?.studios?.id);

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
            <div className="obud-lesson-title-container">
              <h5
                className="obud-studio-title"
                onClick={() => {
                  router.push(`/class/${lesson?.studios?.id}`);
                }}
              >
                {lesson?.studios?.title || ''}
                <div className="arrow-icon" />
              </h5>
              <h4 className="obud-lesson-title">{lesson?.title || ''}</h4>
            </div>
            <div className="obud-lesson-icons">
              <Share data={lesson} title={lesson?.title || ''} isHide={false} />
            </div>
          </div>
        </SLessonOption>
      </section>

      <Tabs>
        <TabPane tab={TabType.RESERVATION} tabName="예약하기">
          <div className="obud-padding-container">
            <section className="obud-line" />
            <div className="obud-option-container">{/* <StudioOption studio={studio || {}} /> */}</div>
            <section className="obud-line" />
            <section className="obud-studio-map">
              <div className="obud-map-title">위치 정보</div>
              {/* <ProductMap addr={studio?.addr || ''} /> */}
              {/* <div className="obud-map-address">{studio?.addr || ''}</div> */}
            </section>
          </div>
        </TabPane>
        <TabPane tab={TabType.DETAIL} tabName="상세정보">
          <section className="obud-lesson-detail-contents-container" dangerouslySetInnerHTML={{ __html: lesson?.contents || '' }} />
          <section className="obud-lesson-detail-contents-container" dangerouslySetInnerHTML={{ __html: studio?.contents || '' }} />
          <section className="obud-lesson-studio">
            <div className="obud-lesson-studio-title">장소 정보</div>
            <div className="line" />
            <div className="studio-container">
              {studio && <CustomImage src={studio?.images[0].url || ''} alt={studio?.title} width={100} height={100} layout="fixed" />}
              <div className="detail-container">
                <div className="title-wrapper">
                  <div className="title">{lesson.studios.title}</div>
                  <h5
                    className="detail"
                    onClick={() => {
                      router.push(`/class/${lesson?.studios?.id}`);
                    }}
                  >
                    상세보기
                    <div className="arrow-icon" />
                  </h5>
                </div>
                <div>{lesson.studios.addr}</div>
              </div>
            </div>
          </section>
        </TabPane>
      </Tabs>

      <section className="obud-line" />

      <section className="obud-lesson-policy">
        <ProductPolicy info={lesson?.studios?.information || ''} policy={lesson?.studios?.refundPolicy || ''} />
      </section>
    </SLesson>
  );
};

export default LessonDetail;

const useStudio = (id: Studio['id']) => {
  return useQuery(['studio', id], () => getStudio(id, ''));
};
