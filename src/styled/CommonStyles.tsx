import styled, { css } from 'styled-components';

/* ////////////////////////////////////////////
                  Spacing
//////////////////////////////////////////// */
export const Spacing = styled.nav<{ spacing?: string; width?: number }>`
  width: 100%;
  height: ${(props) => (props.spacing ? `${props.spacing}px` : '15px')};
  display: block;

  ${(props) =>
    props.width &&
    css`
      width: ${`${props.width}px`};
    `}
`;

/* ////////////////////////////////////////////
                  Flex
//////////////////////////////////////////// */
export const Flex = styled.div<any>`
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.flex &&
    css`
      flex: ${props.flex};
    `};
  ${(props) =>
    props.justifyContent &&
    css`
      justify-content: ${props.justifyContent};
    `};
  ${(props) =>
    props.alignItems &&
    css`
      align-items: ${props.alignItems};
    `};
  ${(props) =>
    props.flexDirection &&
    css`
      flex-direction: ${props.flexDirection};
    `}
  ${(props) =>
    props.flexWrap &&
    css`
      flex-wrap: ${props.flexWrap};
    `}
 ${(props) =>
    props.cursor &&
    css`
      cursor: ${props.cursor};
    `};
  ${(props) =>
    props.padding &&
    css`
      padding: ${props.padding};
    `};
  ${(props) =>
    props.width &&
    css`
      width: ${props.width};
    `};
  ${(props) =>
    props.height &&
    css`
      height: ${props.height};
    `};
  ${(props) =>
    props.margin &&
    css`
      margin: ${props.margin};
    `};
  ${(props) =>
    props.textAlign &&
    css`
      text-align: ${props.textAlign};
    `};
  ${(props) =>
    props.gap &&
    css`
      gap: ${props.gap};
    `};

  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
`;
