'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import styled from 'styled-components';

const SSliderPrimitiveRoot = styled(SliderPrimitive.Root)`
    display: flex; 
    position: relative; 
    align-items: center; 
    width: 100%; 
    touch-action: none; 
    user-select: none;
`;

const SSliderPrimitiveThumb = styled(SliderPrimitive.Thumb)`
    display: block; 
    border-radius: 9999px; 
    border-width: 1px; 
    border-style: solid;
    width: 16px; 
    height: 16px; 
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms; 
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    background-color: white;
`;

const SSliderPrimitiveTrack = styled(SliderPrimitive.Track)`
    position: relative; 
    border-radius: 9999px; 
    width: 100%; 
    height: 1px;
    background-color: black;
`;

const SSliderPrimitiveRange = styled(SliderPrimitive.Range)`
    position: absolute; 
    height: 1px; 
    padding-bottom: 1px;
    padding-top: 1px;
    background-color: #344235;
`;

const SSliderPrimitiveThumbText = styled.div`
    padding-top: 20px;
    transform: translateX(-10px);
    width: 32px;
    text-align: center;
`;

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {valueMap?: any}
>(({ className, tabIndex, valueMap, ...props }, ref) => {
  const [thumbText, setThumbText] = React.useState(['', '']);

  const getThumbText = React.useCallback((values) => {
    const [firstValue, secondValue] = values || ['', ''];

    setThumbText([
      valueMap.find((v) => v.value === firstValue)?.text,
      valueMap.find((v) => v.value === secondValue)?.text,
    ]);
  }, [props.defaultValue]);

  React.useEffect(() => {
    getThumbText(props.defaultValue);
  }, [props.defaultValue]);

  const handleValueChange = (values) => {
    getThumbText(values);
  };

  return (
    <SSliderPrimitiveRoot
      ref={ref}
      className={className}
      {...props}
      onValueChange={(values) => {
        handleValueChange(values);
      }}
      onValueCommit={(values) => {
        props.onValueChange?.(values);
      }}
    >
      <SSliderPrimitiveTrack>
        <SSliderPrimitiveRange />
      </SSliderPrimitiveTrack>
      {(props.value ?? props.defaultValue ?? []).map((value, index) => {
          return (
            <SSliderPrimitiveThumb
              key={value}
              className="rt-SliderThumb"
              {...(tabIndex !== undefined ? { tabIndex } : undefined)}
            >
              <SSliderPrimitiveThumbText>
                {thumbText[index]}
              </SSliderPrimitiveThumbText>
            </SSliderPrimitiveThumb>
          );
      })}

    </SSliderPrimitiveRoot>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
