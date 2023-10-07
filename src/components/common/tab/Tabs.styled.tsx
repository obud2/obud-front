import styled from 'styled-components';

export const STabs = styled.div`
  .tabs-container {
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 1.4;
  }

  .tabs-header {
    display: flex;
    border-bottom: 1px solid;
    border-top: 1px solid;
    border-color: ${(props) => props.theme.core_color_slate_50};
  }

  .tab-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

  .tab {
    padding: 10px 20px;
    cursor: pointer;
  }

  .tab.active {
    font-weight: bold;
    border-bottom: 2px solid;
    border-color: ${(props) => props.theme.main_color_slate_500};
  }
`;
