import React, { useEffect, useRef, useState } from 'react';

import Script from 'next/script';

import { APP_URL, KAKAO_KEY } from 'src/constants';
import { useRouter } from 'next/router';
import { OPTION } from './ShareBox.option';

import Portal from 'src/Portal';
import { SShareBox } from './ShareBox.styled';

const ShareBox = ({ data, title, isOpen, isClose }) => {
  const router = useRouter();

  const modalRef = useRef('');
  const inputRef = useRef();

  const [asTitle, setAsTitle] = useState('');
  const [asPath, setAsPath] = useState('');

  useEffect(() => {
    if (!window?.Kakao?.isInitialized()) {
      window?.Kakao?.init(KAKAO_KEY);
    }
  }, [isOpen]);

  useEffect(() => {
    setAsTitle(title);
  }, [title]);

  useEffect(() => {
    const path = `${APP_URL}${router.asPath}`;

    setAsPath(path);
  }, [router]);

  const onClickClose = (e) => {
    if (e.target === modalRef.current) isClose();
  };

  const onClickShare = (id) => {
    switch (id) {
      case 'kakao':
        shareKakao();
        break;
      case 'naver':
        shareNaver();
        break;
      case 'facebook':
        shareFacebook();
        break;
      case 'twitter':
        shareTwitter();
        break;
      default:
        shareObud();
        break;
    }
  };

  // KaKao
  const shareKakao = () => {
    if (KAKAO_KEY) {
      window?.Kakao?.Link?.sendDefault({
        objectType: 'feed',
        content: {
          title: asTitle,
          imageUrl: data?.images?.[0]?.url || '',
          link: {
            mobileWebUrl: asPath,
            webUrl: asPath,
          },
        },
        buttons: [
          {
            title: '예약하기',
            link: {
              mobileWebUrl: asPath,
              webUrl: asPath,
            },
          },
        ],
      });
    }
  };

  // NAVER
  const shareNaver = () => {
    window.open(`https://share.naver.com/web/shareView?url=${asPath}&title=${asTitle}`);
  };

  // Facebook
  const shareFacebook = () => {
    window.open(`http://www.facebook.com/sharer/sharer.php?u=${asPath}&title=${asTitle}`);
  };

  // Twitter
  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${asPath}${asTitle}`);
  };

  //   Obud
  const shareObud = () => {
    const ele = inputRef.current;

    ele.select();
    ele.setSelectionRange(0, 9999); // 셀렉트 범위 설정

    document.execCommand('copy');
    ele.value = '주소가 복사 되었습니다.';

    setTimeout(() => {
      ele.value = asPath;
    }, 500);
  };

  return (
    <Portal>
      <Script id="kakao-developer" strategy="afterInteractive" src="//developers.kakao.com/sdk/js/kakao.min.js" />

      <SShareBox isOpen={isOpen}>
        <div className="modal-background" ref={modalRef} onClick={onClickClose}>
          <div className="modal-container">
            <header className="modal-header">
              <p>공유하기</p>

              <button className="close-button" onClick={isClose} />
            </header>

            <main className="modal-main">
              <ul className="sns-share-icons">
                {OPTION?.map((item) => (
                  <li key={item?.id} className="sns-share-icon" onClick={() => onClickShare(item?.id)}>
                    <i
                      style={{
                        width: '68px',
                        height: '66px',
                        backgroundSize: '56px',
                        backgroundImage: 'url(/icons/ic_snsIcons.png)',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: item?.position,
                      }}
                    />
                    <p>{item?.title}</p>
                  </li>
                ))}
              </ul>
            </main>

            <footer className="modal-footer">
              <div className="modal-share-container">
                <input className="modal-share-input-box" value={asPath} ref={inputRef} readOnly />
                <button className="modal-share-button" onClick={() => onClickShare()}>
                  복사
                </button>
              </div>
            </footer>
          </div>
        </div>
      </SShareBox>
    </Portal>
  );
};

export default ShareBox;
