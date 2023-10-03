import Head from 'next/head';

/**
 *
 *  og:title - 사이트의 제목
 *  og:type - 사이트의 종류 예) website
 *  og:image - 사이트를 나타낼 대표 이미지(미리보기 이미지)
 *  og:url - 사이트의 대표 url
 *
 */

type Props = {
  url?: string;
  title?: string;
  type?: string;
  image?: string;
  description?: string;
};

const MetaHeader = ({ url, title, type, image, description }: Props) => {
  return (
    <Head>
      {title && <title>{title}</title>}
      {url && <meta property="og:url" content={url} />}
      {title && <meta property="og:title" content={title} />}
      {image && <meta property="og:image" content={image} />}
      {description && <meta property="og:description" content={description} />}

      <meta property="og:type" content={type || 'website'} />
    </Head>
  );
};

export default MetaHeader;
