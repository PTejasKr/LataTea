import React from 'react';
import { OrderingRoadmap } from '../components/public/OrderingRoadmap';
import { RegistrationAndContact } from '../components/public/RegistrationAndContact';

export const ProcessPage: React.FC = () => {
  return (
    <div className="animate-fade-in pb-20">
      <div className="pt-24 sm:pt-32">
        <OrderingRoadmap />
      </div>
      <RegistrationAndContact />
    </div>
  );
};
