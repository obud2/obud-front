import { SBaseTitle } from './BaseTitle.styled';

type Props = {
  title: string;
  basic?: boolean;
};

const BaseTitle = ({ title, basic }: Props) => {
  return (
    <SBaseTitle basic={basic}>
      <p className="base-title text-delay-animation">{title}</p>
      <div className="title-line" />
    </SBaseTitle>
  );
};

export default BaseTitle;
