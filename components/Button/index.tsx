/* eslint-disable @typescript-eslint/ban-types */
// eslint-disable-next-line no-use-before-define
import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Button } from './styles';

interface IButtonProp extends TouchableOpacityProps {
  backgroundColor: string;
}

const ButtonComponent: React.FC<IButtonProp> = ({
  backgroundColor,
  ...rest
}) => {
  return <Button backgroundColor={backgroundColor} {...rest} />;
};

export default ButtonComponent;
