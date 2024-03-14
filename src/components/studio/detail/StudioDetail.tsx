import { TabPane, Tabs } from '@/components/common/tab/Tabs';
import Like from '@/components/option/Like';
import Share from '@/components/option/Share';
import { Studio } from '@/entities/studio';
import { deleteWish, setWish } from '@/service/WishService';
import { useQuery, useQueryClient } from 'react-query';
import ProductImages from './images/ProductImages';
import ProductMap from './map/ProductMap';
import ClassList from './option/ClassList';
import { SStudioOption } from './option/StudioOption.styled';
import StudioDetailList from './StudioDetailList';
import styled from 'styled-components';
import { MOBILE } from 'src/styled/variablesStyles';
import { getLessons } from '@/service/StudioService';
import CustomImage from '@/components/common/image/CustomImage';
import { useRouter } from 'next/router';
import PassList from './option/PassList';
import { Place } from '@/entities/place';
import { PassService } from '@/service/PassService';

type Props = {
  studio: Studio;
};

export type StudioTabType = 'home' | 'reservation';

const StudioDetail = ({ studio }: Props) => {
  const router = useRouter();
  const { query } = router;
  const queryClient = useQueryClient();

  const { data: lessons } = useClassList(studio?.id);
  const { data: passes } = usePasses(studio?.id);

  const onClickWish = async (checked: boolean) => {
    if (checked) {
      await deleteWish(studio?.wishInfo?.wishId);
      queryClient.invalidateQueries(['my-wish-list'], { refetchInactive: true });
    } else {
      await setWish(studio?.id);
      queryClient.invalidateQueries(['my-wish-list'], { refetchInactive: true });
    }
  };

  const validLessons = lessons?.filter((lesson) => !lesson.isSoldOut) ?? [];
  const slicedLessons = validLessons.slice(0, 2);

  return (
    <SStudioDetail>
      <section className="obud-studio-detail-option-container">
        <div className="obud-images-container">
          <div className="studio-detail-list">
            <StudioDetailList studio={studio} />
          </div>
          <div className="product-images">
            <ProductImages images={studio?.images || []} />
          </div>
        </div>
      </section>

      <SStudioOption>
        <div className="obud-studio-header">
          <h4 className="obud-studio-title">{studio?.title || ''}</h4>
          <div className="obud-studio-category-container">{studio?.category?.join(', ')}</div>
          <div className="obud-studio-icons">
            <Like value={studio?.wishInfo?.isWish ?? false} onClick={onClickWish} />
            <Share isHide={false} data={studio} title={studio?.title || ''} />
          </div>
        </div>
      </SStudioOption>

      <Tabs defaultTab="home">
        <TabPane tab="home" tabName="홈">
          <div className="obud-padding-container">
            <section className="lesson-container">
              <div className="container-title">예약</div>
              {slicedLessons.map((lesson) => (
                <div key={lesson.id} className="card" onClick={() => router.push(`/lesson/${lesson.id}`)} style={{ cursor: 'pointer' }}>
                  <div className="content-container">
                    <div className="content-title">{lesson.title}</div>
                    <div className="content-price">
                      {lesson.minPrice === lesson.maxPrice
                        ? `${(lesson.minPrice ?? 0).toLocaleString()} 원`
                        : `${(lesson.minPrice ?? 0).toLocaleString()} ~ ${(lesson.maxPrice ?? 0).toLocaleString()} 원`}
                    </div>
                  </div>
                  <CustomImage
                    className="image"
                    src={lesson.images?.[0]?.url || ''}
                    alt={lesson.title}
                    width={80}
                    height={80}
                    layout="fixed"
                  />
                </div>
              ))}
            </section>
            <div className="load-more-line">
              {validLessons.length > 2 && (
                <div onClick={() => router.replace({ query: { ...query, tab: 'reservation' } })} className="load-more">
                  더보기
                </div>
              )}
            </div>

            {passes && passes.length > 0 && (
              <>
                <section className="pass-container">
                  <div className="pass-title-container">
                    <span className="pass-title">패스/회원권 가격</span>
                    <span className="pass-purchase-button" onClick={() => router.replace({ query: { ...query, tab: 'pass' } })}>
                      구매하러 가기
                    </span>
                    <div className="arrow-icon"></div>
                  </div>
                  {passes.map((pass) => (
                    <div key={pass.id} className="pass-item">
                      <span>{pass.title}</span>
                      <span className="pass-dotted-line"></span>
                      <span>{pass.price.toLocaleString()}</span>
                    </div>
                  ))}
                </section>
                <div className="obud-line" />
              </>
            )}

            <section className="place-container">
              <div className="container-title">장소 정보</div>

              <div className="item-container">
                <div className="icons-container">
                  <i className="icons location" />
                </div>
                <div className="description">
                  {studio?.addr && <span>{studio.addr}</span>}
                  {studio?.addrDetail && <span> {studio.addrDetail}</span>}
                </div>
              </div>

              {studio?.serviceCenter && (
                <div className="item-container">
                  <div className="icons-container">
                    <i className="icons contact" />
                  </div>
                  <div className="description">{studio?.serviceCenter}</div>
                </div>
              )}

              {studio?.homepage && (
                <a href={studio?.homepage || ''} target="blank">
                  <div className="item-container">
                    <div className="icons-container">
                      <i className="icons url" />
                    </div>
                    <div className="description">{studio?.homepage}</div>
                  </div>
                </a>
              )}
            </section>
            <div className="obud-line" />

            <section className="information-container">
              <div className="container-title">편의시설</div>
              <div>
                <div className="item-container">
                  <div className="icons-container">
                    <i className="icons parking" />
                  </div>
                  <div className="description">{studio?.parking ? '주차 가능' : '주차 불가능'}</div>
                </div>
                {studio?.parkingInfo && (
                  <div className="parking-info">
                    <div className="parking-description">{studio?.parkingInfo}</div>
                  </div>
                )}
                {studio?.convenience?.map((item, index) => (
                  <div className="item-container" key={index}>
                    <div className="icons-container">
                      <i className="icons info" />
                    </div>
                    <div className="description">{item}</div>
                  </div>
                ))}
              </div>
            </section>
            <div className="obud-line" />

            <section className="map-container">
              <div className="container-title">위치 정보</div>
              <ProductMap addr={studio?.addr || ''} />
            </section>
          </div>
        </TabPane>
        <TabPane tab="reservation" tabName="예약">
          <ClassList studioId={studio?.id || ''} />
        </TabPane>
        {passes && passes.length > 0 && (
          <TabPane tab="pass" tabName="패스">
            <PassList placeId={studio?.id || ''} />
          </TabPane>
        )}
      </Tabs>
    </SStudioDetail>
  );
};

export default StudioDetail;

const useClassList = (studioId: Studio['id']) => {
  return useQuery(['class-list', studioId], () => getLessons(studioId), { select: (data) => data.value });
};

const usePasses = (placeId: Place['id']) => {
  return useQuery(['passes', placeId], () => PassService.listPasses({ placeId, status: 'ACTIVE' }), { select: (data) => data?.value });
};

const PRODUCT_MAX_WIDTH = `${688 + 30}px`;

export const SStudioDetail = styled.article`
  width: 100%;
  max-width: ${PRODUCT_MAX_WIDTH};

  margin: 0 auto;

  display: flex;
  flex-direction: column;

  position: relative;

  ${MOBILE} {
    max-width: 100%;
  }

  .obud-padding-container {
    padding: 40px 15px 0;
    font-weight: normal;

    color: #000;

    ${MOBILE} {
      padding: 24px 0;
    }
  }

  .obud-line {
    position: relative;
    width: 100%;
    height: 5px;

    background-color: ${(props) => props.theme.core_color_slate_50};

    margin: 40px 0;

    ${MOBILE} {
      margin: 12px 0;
    }
  }

  .load-more-line {
    position: relative;
    width: 100%;
    height: 1px;

    background-color: ${(props) => props.theme.core_color_slate_50};

    margin: 40px 0;

    ${MOBILE} {
      margin: 10px 0;
    }

    .load-more {
      position: absolute;
      top: -10px;
      left: 50%;
      transform: translateX(-50%);

      background-color: ${(props) => props.theme.core_color_slate_50};
      border-radius: 12px;
      padding: 4px 12px;

      font-size: 1.1rem;
      font-weight: 700;
      color: ${(props) => props.theme.core_color_slate_900};

      cursor: pointer;
    }
  }

  .obud-studio-detail-step-container {
    width: 100%;
    max-width: ${PRODUCT_MAX_WIDTH};

    margin: 0 auto;

    ${MOBILE} {
      max-width: 100%;
      padding: 0 0 8px 0;
    }
  }

  .obud-studio-detail-option-container {
    width: 100%;
    max-width: ${PRODUCT_MAX_WIDTH};
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    gap: 40px;

    ${MOBILE} {
      display: flex;
      flex-direction: column;

      max-width: 100%;
      padding: 0;

      gap: 12px;
    }

    .obud-images-container {
      width: 100%;
      position: relative;

      .studio-detail-list {
        display: none;
        ${MOBILE} {
          display: block;
        }
      }

      .product-images {
        ${MOBILE} {
          display: none;
        }
      }
    }
  }

  .obud-option-container {
    width: 100%;
    position: relative;
  }

  .obud-studio-detail-contents-container {
    width: 100%;
    max-width: ${PRODUCT_MAX_WIDTH};

    margin: 0 auto;

    font-size: 13px;
    color: ${(props) => props?.theme?.sub_color_slate_700};

    * {
      img {
        width: 100%;
        height: auto;
      }
    }

    ${MOBILE} {
      width: 100%;
      padding: 0;

      overflow: hidden;
    }
  }

  .lesson-container {
    padding: 0 10px;

    .container-title {
      font-size: 1.7rem;
      font-weight: 700;
      line-height: 140%;

      padding-top: 5px;
      padding-bottom: 5px;

      ${MOBILE} {
        font-size: 1.6rem;
      }
    }

    .card {
      display: flex;
      padding: 10px;
      justify-content: space-between;
      border-bottom: 1px solid #e5e5e5;

      &:last-child {
        border-bottom: none;
      }

      .content-container {
        padding: 4px;
        .content-title {
          font-size: 1.6rem;
          font-weight: 500;
          line-height: 140%;
          color: ${(props) => props?.theme?.core_color_slate_900};
          margin-bottom: 4px;
        }
      }

      .image {
        border: 1px solid #e5e5e5 !important;
      }
    }
  }

  .pass-container {
    padding: 10px;

    .pass-title-container {
      display: flex;
      align-items: center;
      padding: 30px 0;

      ${MOBILE} {
        padding: 10px 0;
      }

      .pass-title {
        font-size: 1.7rem;
        font-weight: 700;

        ${MOBILE} {
          font-size: 1.6rem;
        }
      }

      .pass-purchase-button {
        color: #1d64d0;
        margin-left: 10px;
        cursor: pointer;
      }

      .arrow-icon {
        width: 7px;
        height: 7px;

        transform: rotate(45deg);
        border-top: 1px solid #1d64d0;
        border-right: 1px solid #1d64d0;

        margin-top: 3px;
        margin-right: 6px;
        top: -1px;
        position: relative;
      }
    }

    .pass-item {
      display: flex;
      align-items: center;
      margin: 2px 10px;

      .pass-dotted-line {
        border-bottom: 1px dotted ${(props) => props.theme.core_color_slate_200};
        flex: 1;
        margin: 0 5px;
      }
    }
  }

  .place-container {
    padding: 0 10px;

    .address {
      padding: 8px 0;
    }

    .item-container {
      display: flex;
      align-items: center;
      padding: 8px 0;
      margin-left: 10px;

      .description {
        margin-left: 4px;
        color: ${(props) => props?.theme?.sub_color_slate_700};
      }
    }
  }

  .information-container {
    padding: 0 10px;

    .address {
      padding: 8px 0;
    }

    .item-container {
      display: flex;
      align-items: center;
      padding: 8px 0;
      margin-left: 10px;

      .description {
        margin-left: 4px;
        color: ${(props) => props?.theme?.sub_color_slate_700};
      }
    }

    .parking-info {
      padding-bottom: 8px;
      margin-left: 32px;

      .parking-title {
        font-size: 1.3rem;
        font-weight: 700;
        line-height: 140%;
        color: ${(props) => props?.theme?.core_color_slate_900};
        margin-bottom: 4px;
      }

      .parking-description {
        color: ${(props) => props?.theme?.sub_color_slate_700};
      }
    }
  }

  .map-container {
    padding: 0 10px;
  }

  .container-title {
    font-size: 1.7rem;
    font-weight: 700;
    line-height: 140%;

    padding-top: 8px;
    padding-bottom: 8px;

    ${MOBILE} {
      font-size: 1.6rem;
    }
  }

  .obud-studio-map {
    width: 100%;
    max-width: ${PRODUCT_MAX_WIDTH};

    padding: 0 0 104px;
    margin: 0 auto;

    font-size: 1.6rem;
    color: #000;

    ${MOBILE} {
      max-width: 100%;
      padding: 0;
    }
  }

  .map-address {
    font-size: 1.3rem;
    padding-top: 5px;
  }

  .icons-container {
    width: 13px;
    height: 13px;
    margin-right: 4px;

    display: flex;
    align-items: center;
    justify-content: center;

    .location {
      width: 13px;
      height: 15px;
    }
    .url {
      width: 15px;
      height: 15px;
    }
    .parking {
      width: 11px;
      height: 15px;
    }
    .info {
      width: 15px;
      height: 15px;
    }
    .home {
      width: 20px;
      height: 17px;
    }
    .contact {
      width: 20px;
      height: 17px;
    }
  }
`;
