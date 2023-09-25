export interface SCustomCheckBoxProps {
  readonly active?: boolean;

  readonly style?: any;

  readonly disabled?: any;
}

export interface CustomCheckBoxProps extends SCustomCheckBoxProps {
  readonly label?: string;

  readonly value?: any;
  readonly more?: string;
  readonly moreTitle?: string;

  readonly onClick?: any;
}

export interface SCheckBoxProps {
  readonly isCheck: boolean;
  readonly onClick: any;
}
