export interface CustomInputProps extends SCustomInputProps {
  readonly ref?: any;
  readonly type?: string;
  readonly label?: string;
  readonly point?: boolean;

  readonly onChange?: any;
  readonly onKeyDown?: any;

  readonly placeholder?: string;

  readonly name?: string;
  readonly value?: any;

  readonly isError?: boolean;
  readonly helpText?: string;

  readonly maxLength?: number;
}

export interface SCustomInputProps {
  readonly color?: any;
  readonly style?: any;
  readonly width?: any;
  readonly height?: any;
  readonly fontSize?: any;
  readonly variant?: any;
  readonly disabled?: boolean;
}
