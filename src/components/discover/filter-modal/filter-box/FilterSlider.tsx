import { Slider } from '@/components/common/slider/Slider';
import React, { useState } from 'react';

const TimeValueMap = [{
    value: 0,
    text: '5am',
}, {
    value: 1,
    text: '6am',
}, {
    value: 2,
    text: '7am',
}, {
    value: 3,
    text: '8am',
}, {
    value: 4,
    text: '9am',
}, {
    value: 5,
    text: '10am',
}, {
    value: 6,
    text: '11am',
}, {
    value: 7,
    text: '12pm',
}, {
    value: 8,
    text: '1pm',
}, {
    value: 9,
    text: '2pm',
}, {
    value: 10,
    text: '3pm',
}, {
    value: 11,
    text: '4pm',
}, {
    value: 12,
    text: '5pm',
}, {
    value: 13,
    text: '6pm',
}, {
    value: 14,
    text: '7pm',
}, {
    value: 15,
    text: '8pm',
}, {
    value: 16,
    text: '9pm',
}, {
    value: 17,
    text: '10pm',
}];

export const FilterSlider = () => {
    const [value] = useState([9, 12]);

    const handleValueChange = (e) => {
        console.log(e);
    };

    return (
      <div>
        <Slider max={17} step={1} defaultValue={value} onValueChange={handleValueChange} valueMap={TimeValueMap} />
      </div>
    );
};
