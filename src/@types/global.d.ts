declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage: (message: string) => void;
    };
    naver: naver.maps;
  }
}

export {};
