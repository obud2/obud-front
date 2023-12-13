import { Studio } from '@/entities/studio';
import { useRouter } from 'next/router';

import StudioItem from './StudioItem';
import { StudioSort } from './StudioList.option';
import { SStudioList } from './StudioList.styled';

type Props = {
  title?: string;
  list: Studio[];
  isSort?: boolean;
};

const StudioList = ({ title, list, isSort }: Props) => {
  const router = useRouter();

  const onChangeFilter = (e) => {
    const value = e.target.value;

    if (value !== 'all') {
      router.push(`/class?sort=${value}`);
    } else {
      router.push('/class');
    }
  };

  return (
    <SStudioList isShow={list && list?.length > 0}>
      <p className="list-title">{title}</p>

      <div className="regular-list">
        {isSort && (
          <div className="list-sort-filter-container">
            <select className="list-sort-filter" onChange={onChangeFilter}>
              {StudioSort.map((item) => (
                <option key={item?.id} value={item?.id}>
                  {item?.title}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="class-list-container">
          {list && list?.length > 0 ? (
            list?.map((item) => (
              <StudioItem
                key={item?.id}
                id={item?.id || ''}
                images={item?.images || []}
                title={item?.title || ''}
                category={item?.category || ''}
                lessonType={item?.lessonType || ''}
                addr={item?.addr || ''}
              />
            ))
          ) : (
            <p className="empty-text">등록 된 상품이 없습니다.</p>
          )}
        </div>
      </div>
    </SStudioList>
  );
};

export default StudioList;
