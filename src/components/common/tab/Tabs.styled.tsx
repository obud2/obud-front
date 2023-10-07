import styled from 'styled-components';

export const STabs = styled.div`
  .tabs-container {
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 1.4;
  }

  .tabs-header {
    position: relative;
    display: flex;
    border-bottom: 1px solid;
    border-top: 1px solid;
    border-color: ${(props) => props.theme.core_color_slate_50};
  }

  .tabs-highlight {
    position: absolute;
    top: 38px;
    height: 2px;
    background-color: ${(props) => props.theme.main_color_slate_500};
    transition: left 0.3s, width 0.3s;
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

  .hidden-tab {
    visibility: hidden;
    position: absolute;
    pointer-events: none;
  }

  .visible-tab {
    visibility: visible;
  }
`;
