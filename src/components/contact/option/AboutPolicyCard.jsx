import React from 'react';
import { SAboutPolicyCard } from './AboutPolicyCard.styled';

const AboutPolicyCard = ({ label, contents }) => {
  return (
    <SAboutPolicyCard>
      <label className="about-policy-label">{label}</label>

      <div className="about-policy-contents">{contents}</div>
    </SAboutPolicyCard>
  );
};

export default AboutPolicyCard;
