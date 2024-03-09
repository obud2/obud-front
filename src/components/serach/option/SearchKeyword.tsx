import { useQuery } from 'react-query';
import { SearchService } from 'src/service/SearchService';

import styled from 'styled-components';

const SearchKeyword = ({ onClick }) => {
  const { data } = useQuery(['keyword'], () => SearchService.listKeywords(), {
    select: (data) => data.value?.filter((item) => item.id !== 'test'),
  });

  return (
    <SSearchKeyword>
      <p className="keyword-title">인기검색어</p>

      <div className="keyword-container">
        {data?.map((item) => (
          <div key={item.id} className="keyword-item" onClick={() => onClick(item.id)}>
            {item.id || ''}
          </div>
        ))}
      </div>
    </SSearchKeyword>
  );
};

export default SearchKeyword;

const SSearchKeyword = styled.div`
  width: 100%;
  padding: 30px 0;

  .keyword-title {
    font-size: 1.4rem;
    font-weight: 500;

    /* color: ${(props) => props.theme.sub_color_slate_600}; */
  }

  .keyword-container {
    padding: 20px 0;

    .keyword-item {
      display: inline-flex;
      align-items: center;
      justify-content: center;

      border: 1px solid rgb(238, 238, 238) !important;
      border-radius: 20px;
      margin-right: 10px;
      margin-bottom: 10px;

      font-size: 1.2rem;
      /* color: rgb(126, 126, 126) !important; */
      background-color: transparent !important;

      cursor: pointer;

      min-width: auto;
      height: 25px;

      padding: 0 13px;

      &:hover {
        opacity: 0.7;
      }
    }
  }
`;
