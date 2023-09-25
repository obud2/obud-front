// Style Props
export interface SCustomButtonProps {
  readonly fontSize?: string;
  readonly fullWidth?: boolean;

  readonly width?: string;
  readonly height?: string;
  readonly margin?: string;
  readonly textColor?: string;
  readonly borderRadius?: string;
  readonly backgroundColor?: string;
  readonly borderColor?: string;
  readonly fontWeight?: string;

  readonly variant?: string; //  contained : 꽉찬 버튼 (default) || outlined : 윤곽 버튼

  readonly tabIndex?: number;
}

// Component Props
export interface CustomButtonProps extends SCustomButtonProps {
  readonly id?: string;
  readonly className?: string;

  readonly onClick: (e: any) => void;
  readonly disabled?: boolean;
  readonly isLoading?: boolean;

  readonly style?: any;
  readonly children?: any;
}
