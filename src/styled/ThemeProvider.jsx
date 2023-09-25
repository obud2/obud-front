import React from 'react';

import { ThemeProvider as Provider, createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

// Theme Styled
const GlobalStyle = createGlobalStyle`
    ${normalize}

    html {
      font-size: 62.5%;
    }
  `;

const ThemeProvider = ({ children }) => {
  const theme = {
    main_color_slate_500: '#344235',
    main_color_slate_400: '#4E5C4F',
    main_color_slate_300: '#758271',
    main_color_slate_200: '#A9B6A4',
    main_color_slate_100: '#DADBD6',

    core_color_slate_50: '#E8E7E7',
    core_color_slate_100: '#CFCFCF',
    core_color_slate_200: '#B8B8B8',
    core_color_slate_300: '#9F9F9F',
    core_color_slate_400: '#888888',
    core_color_slate_500: '#706F6F',
    core_color_slate_600: '#585858',
    core_color_slate_700: '#403F3F',
    core_color_slate_800: '#282828',
    core_color_slate_900: '#100F0F',

    sub_color_slate_50: '#FDFDFD',
    sub_color_slate_100: '#E4E4E4',
    sub_color_slate_200: '#CACACA',
    sub_color_slate_300: '#B1B1B1',
    sub_color_slate_400: '#989898',
    sub_color_slate_500: '#7E7E7E',
    sub_color_slate_600: '#656565',
    sub_color_slate_700: '#4C4C4C',
    sub_color_slate_800: '#333333',
    sub_color_slate_900: '#191919',
  };

  return (
    <Provider theme={theme}>
      <GlobalStyle />

      {children}
    </Provider>
  );
};

export default ThemeProvider;
