/* eslint-disable no-use-before-define */
import React from 'react';

import { Lamp } from './styles';

interface LampProps {
  backgroundColor: string;
}

const LampComponent: React.FC<LampProps> = ({ backgroundColor }) => {
  return <Lamp backgroundColor={backgroundColor} />;
};

export default LampComponent;
