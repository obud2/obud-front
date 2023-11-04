export interface CustomRadioProps {
  readonly label?: string;
  readonly point?: boolean;

  readonly value?: string;
  readonly children: any;
  readonly onChange: any;
}

export interface SCustomRadioProps {
  readonly column?: boolean;
}

export type CustomRadioItemProps = SCustomRadioItemProps;

export interface SCustomRadioItemProps {
  readonly value?: string;
  readonly label?: string;

  readonly isChecked?: boolean;
  readonly disabled?: boolean;
}
