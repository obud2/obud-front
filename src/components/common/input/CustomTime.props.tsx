export interface CustomTimeProps extends SCustomTimeProps {
  readonly ref?: any;
  readonly label?: string;
  readonly point?: boolean;

  readonly onChange?: any;

  readonly placeholder?: string;

  readonly value?: any;

  readonly err?: boolean;

  readonly maxLength?: number;
}

export interface SCustomTimeProps {
  readonly color?: any;
  readonly style?: any;
  readonly width?: any;
  readonly height?: any;
  readonly fontSize?: any;
  readonly disabled?: boolean;
}
