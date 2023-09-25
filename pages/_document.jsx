import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

import { ServerStyleSheet } from 'styled-components';

/*
  렌더링 순서

  _app.js -> _document.js

  - [_documents.js] -
  주로 css 적용하는데 사용

  공통적으로 활용할 <head>나 <body> 태그 안에 들어갈 내용들을 커스텀할때 활용합니다.

  주요 사용 목적
  폰트 임포트
  charset, 웹 접근성 관련 태그 설정

*/

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head></Head>
        <div className="loader">
          <div className="loader_background" />
        </div>

        <body>
          <Main />
          <div id="__portal"></div>
          <NextScript />
        </body>
      </Html>
    );
  }
}
