import styled from 'styled-components';
import { MOBILE } from 'src/styled/variablesStyles';

export const STabs = styled.div`
  .tabs-container {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.4;
    ${MOBILE} {
      font-size: 13px;
    }
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
    padding: 10px 20px;
    flex: 1;

    font-size: 15px;
    font-weight: 500;
    
    ${MOBILE} {
      font-size: 14px;
    }

    &.active {
      background-color: ${(props) => props.theme.main_color_slate_500};
      color: #fff;
    }
  }

  .tab {
    padding: 10px 20px;
    cursor: pointer;

    &.active {
      background-color: ${(props) => props.theme.main_color_slate_500};
      color: #fff;
    }
  }

  .hidden-tab {
    display: none;
  }

  .visible-tab {
    visibility: visible;
    min-height: 300px;
  }
`;
