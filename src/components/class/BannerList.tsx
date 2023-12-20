import '@egjs/flicking-plugins/dist/arrow.css';
import '@egjs/flicking-plugins/dist/pagination.css';
import Flicking, { ViewportSlot } from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking-inline.css';
import '@egjs/react-flicking/dist/flicking.css';
import { Arrow, Pagination, AutoPlay } from '@egjs/flicking-plugins';

import { LayoutContext } from '@/context/LayoutContext';
import { Banner } from '@/entities/banner';
import { MAX_WIDTH, TABLET, TABLET_MAX_WIDTH, MOBILE } from '@/styled/variablesStyles';

import React, { useContext, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import BannerItem from './BannerItem';

type Props = {
  banners: Banner[];
};

const BannerList = ({ banners }: Props) => {
  const { matchese } = useContext(LayoutContext);
  const flickingRef = useRef<Flicking>(null);

  useEffect(() => {
    if (flickingRef.current) {
      const plugins = [new Arrow(), new Pagination({ type: 'fraction' }), new AutoPlay({ duration: 6000, direction: 'NEXT' })];
      flickingRef.current.addPlugins(...plugins);
    }
  }, []);

  return (
    <SBannerList isShow={banners.length > 0}>
      <p className="list-title">Special</p>
      <div className="banner-list">
        <div className="item-container">
          <Flicking ref={flickingRef} circular align="prev" panelsPerView={matchese ? 1 : 4}>
            {banners.map((banner) => (
              <div className="panel" key={`panel_${banner.id}`}>
                <BannerItem banner={banner} />
              </div>
            ))}
            <ViewportSlot>
              <div className="filcking-arrow-container">
                <span className="flicking-arrow-prev"></span>
                <span className="flicking-arrow-next"></span>
              </div>
              <div className="flicking-pagination" />
            </ViewportSlot>
          </Flicking>
        </div>
      </div>
    </SBannerList>
  );
};

export default BannerList;

export const SBannerList = styled.div<{ isShow: boolean }>`
  width: 100%;
  display: none;

  ${(props) =>
    props.isShow &&
    css`
      display: block;
    `}

  .list-title {
    max-width: ${MAX_WIDTH};
    padding: 0 15px;
    padding-bottom: 16px;

    margin: 0 auto;

    font-size: 1.5rem;
    font-weight: 600;
    text-align: left;

    ${TABLET} {
      max-width: ${TABLET_MAX_WIDTH};
    }

    ${MOBILE} {
      display: none;
    }
  }

  .banner-list {
    width: 100%;

    border-top: 0.5px solid rgba(218, 219, 214, 0.5);
    margin-bottom: 64px;

    ${MOBILE} {
      margin-bottom: 0;
    }

    .item-container {
      max-width: ${MAX_WIDTH};
      padding: 40px 15px;
      padding-bottom: 32px;

      margin: 0 auto;

      ${TABLET} {
        max-width: ${TABLET_MAX_WIDTH};
      }

      ${MOBILE} {
        max-width: 100%;
        padding: 0;
      }

      .panel {
        overflow: hidden;
        position: relative;

        margin-right: 24px;
        margin-bottom: 50px;

        ${MOBILE} {
          margin-right: 12px;
          margin-bottom: 24px;
        }
      }

      .flicking-pagination {
        font-size: 1.4rem;
        font-weight: 500;
        color: ${(props) => props.theme.core_color_slate_600};

        bottom: 0px;

        ${MOBILE} {
          width: 47px;
          height: 21px;
          background-color: rgba(0, 0, 0, 0.4);
          border-radius: 15px;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 1.3rem;

          bottom: 90px;
          right: 15px;
          left: auto;

          color: #ffffff;
        }
      }

      .flicking-pagination-bullet {
        width: 6px;
        height: 6px;
        margin: 0 2px;

        &.flicking-pagination-bullet-active {
          background-color: ${(props) => props.theme.main_color_slate_300};
        }
      }

      .filcking-arrow-container {
        width: 100px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        bottom: -2px;
        left: 50%;
        transform: translateX(-50%);
        position: absolute;

        z-index: 5000;

        ${MOBILE} {
          display: none;
        }
      }

      .flicking-arrow-prev,
      .flicking-arrow-next {
        display: inline-block;
        width: 16px;
        height: 16px;

        right: auto;
        top: auto;
        left: auto;
        bottom: auto;
        transform: translate(0, 0);

        position: relative;

        &::before,
        &::after {
          width: 7px;
          height: 1px;
          left: 6px;

          background-color: ${(props) => props.theme.core_color_slate_600};
        }

        &::before {
          top: 25%;
        }
        &::after {
          top: calc(50% - 4px);
        }
      }
    }
  }
`;
