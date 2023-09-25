import React from 'react';

import { useRouter } from 'next/router';
import { firstTextUpperCase, textSilce } from 'src/constants';

import { SSteps } from './Steps.styled';

const Steps = ({ steps }) => {
  const router = useRouter();

  const onClickStepLink = (link) => {
    if (link) router.push(link);
  };

  return (
    <SSteps>
      {steps &&
        steps?.length > 0 &&
        steps?.map((item) => (
          <React.Fragment key={`steps_${item?.label}`}>
            <li className={`steps-item text-delay-animation ${item?.link ? 'isLink' : ''}`}>
              <p className="steps-item-text" onClick={() => onClickStepLink(item?.link)}>
                {textSilce(firstTextUpperCase(item?.label), 7)}
              </p>
            </li>
          </React.Fragment>
        ))}
    </SSteps>
  );
};

export default Steps;
