import { MainContainer } from './Layout.styled';

type Props = {
  children: React.ReactNode;
};

const Main = ({ children }: Props) => {
  return <MainContainer>{children}</MainContainer>;
};

export default Main;
