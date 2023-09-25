export interface CustomTextareaProps extends SCustomTextareaProps {
  readonly ref?: any;
  readonly type?: string;
  readonly label?: string;
  readonly point?: boolean;

  readonly onChange?: any;
  readonly onKeyDown?: any;

  readonly placeholder?: string;

  readonly name?: any;
  readonly value?: any;

  readonly err?: boolean;
  readonly helpText?: string;

  readonly rows?: number;
  readonly maxLength?: number;
}

export interface SCustomTextareaProps {
  readonly style?: any;
  readonly width?: any;
  readonly height?: any;
  readonly fontSize?: any;
  readonly disabled?: boolean;
}
