export interface CustomSelectProps extends SCustomSelectProps {
  readonly children?: any;

  readonly className?: string;
  readonly label?: string;
  readonly point?: string;
  readonly value?: string;

  readonly isError?: boolean;
  readonly placeholder?: string;

  readonly onChange?: any;
}

export interface SelectItemsProps {
  readonly children?: any;
  readonly value?: any;
  readonly isDisabled?: boolean;
}

export interface SCustomSelectProps {
  readonly style?: any;
  readonly color?: any;
  readonly borderBottom?: string;
  readonly border?: string;

  readonly spaceNowrap?: string;
  readonly textPosition?: string;

  readonly variant?: string;

  readonly disabled?: boolean;
}
