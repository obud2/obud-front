import { Slider } from '@/components/common/slider/Slider';
import { useFilter } from '@/components/discover/filter-modal/FilterContext';
import React from 'react';

export const TimeValueMap = [{
    value: 0,
    text: '5am',
    time: 5,
}, {
    value: 1,
    text: '6am',
    time: 6,
}, {
    value: 2,
    text: '7am',
    time: 7,
}, {
    value: 3,
    text: '8am',
    time: 8,
}, {
    value: 4,
    text: '9am',
    time: 9,
}, {
    value: 5,
    text: '10am',
    time: 10,
}, {
    value: 6,
    text: '11am',
    time: 11,
}, {
    value: 7,
    text: '12pm',
    time: 12,
}, {
    value: 8,
    text: '1pm',
    time: 13,
}, {
    value: 9,
    text: '2pm',
    time: 14,
}, {
    value: 10,
    text: '3pm',
    time: 15,
}, {
    value: 11,
    text: '4pm',
    time: 16,
}, {
    value: 12,
    text: '5pm',
    time: 17,
}, {
    value: 13,
    text: '6pm',
    time: 18,
}, {
    value: 14,
    text: '7pm',
    time: 19,
}, {
    value: 15,
    text: '8pm',
    time: 20,
}, {
    value: 16,
    text: '9pm',
    time: 21,
}, {
    value: 17,
    text: '10pm',
    time: 22,
}];

export const FilterSlider = () => {
    const { time, setTime } = useFilter();

    return (
      <Slider min={0} max={17} step={1} defaultValue={time} onValueChange={setTime} valueMap={TimeValueMap} />
    );
};
