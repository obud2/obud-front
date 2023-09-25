import React, { useMemo, useEffect, useRef } from 'react';

import { throttle } from 'lodash';
import { InfiniteScrollActionProps } from './InfiniteScrollAction.props';

const InfiniteScrollAction: React.FC<InfiniteScrollActionProps> = ({ children, data, fetchNextPage, isFetchingNextPage }) => {
  const scrollRef = useRef<any>();

  const pageScroll = useMemo(
    () =>
      throttle(() => {
        if (scrollRef?.current) {
          if (isFetchingNextPage) {
            return;
          }

          const ele = scrollRef?.current?.clientHeight ? scrollRef?.current?.clientHeight : 0 - 1300;
          const sc = window?.scrollY;

          if (sc > ele) {
            if (data?.pages[data?.pages.length ? data?.pages.length : 0 - 1].nextPage) {
              fetchNextPage();
            }
          }
        }
      }, 300),
    [scrollRef, fetchNextPage, isFetchingNextPage, data],
  );

  useEffect(() => {
    window.addEventListener('scroll', pageScroll);

    return () => window.removeEventListener('scroll', pageScroll);
  }, [pageScroll]);

  return (
    <div ref={scrollRef}>
      {children}
      {isFetchingNextPage && <FetchingNextLoading />}
    </div>
  );
};

const FetchingNextLoading = () => {
  return (
    <div style={{ margin: '20px 0' }}>
      <span className="icons svg-loading"></span>
    </div>
  );
};

export default InfiniteScrollAction;
