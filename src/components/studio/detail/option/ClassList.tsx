import { addComma } from '@/constants';
import { Studio } from '@/entities/studio';
import StudioService from '@/service/StudioService';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { SClassList } from './ClassList.styled';

type Props = {
  studioId: Studio['id'];
};

const ClassList = ({ studioId }: Props) => {
  const { data, isLoading } = useQuery<any>(['class-list', studioId], () => StudioService.getLessons(studioId));
  const router = useRouter();

  const onClickGoLesson = (e: string) => {
    router.push(`/lesson/${e}`);
  };

  return (
    <SClassList>
      {!isLoading &&
        (data?.value?.length > 0 ? (
          <ul className="class-item-list-container">
            {data?.value
              ?.sort((a: any, b: any) => (a.sortOrder < b.sortOrder ? 1 : -1))
              ?.map((item: any) => {
                const showMaxPrice = !!item?.maxPrice && item?.maxPrice !== item?.minPrice;
                return (
                  <li
                    key={item?.id}
                    className={`class-item ${item?.isSoldOut ? 'isSoldOut' : ''}`}
                    onClick={() => onClickGoLesson(item?.id)}
                  >
                    <div className="class-title-container">
                      <p>{item?.title || ''}</p>
                      {item?.isSoldOut && <div className="item-impossible">품절</div>}
                    </div>
                    <div className="class-price-container">
                      {!showMaxPrice && <p>{addComma(item?.minPrice || 0)}원</p>}
                      {showMaxPrice && (
                        <p>
                          {addComma(item?.minPrice || 0)}원 - {addComma(item?.maxPrice)}원
                        </p>
                      )}
                      <div className="class-arrow-icon" />
                    </div>
                  </li>
                );
              })}
          </ul>
        ) : (
          <p className="empty-text">등록된 수업이 없습니다.</p>
        ))}

      {isLoading && <ClassFallbackLoading />}
    </SClassList>
  );
};

const ClassFallbackLoading = () => {
  return (
    <div className="class-fallback-loading">
      <i className="icons svg-loading" />
    </div>
  );
};

export default ClassList;
