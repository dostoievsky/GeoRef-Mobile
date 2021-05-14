import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

interface optionsProps {
  name: string;
  size: number;
  color: string;
}

const NavigationIcon: React.FC<optionsProps> = ({name, size, color}) => {
  return (
    <Icon name={name} size={size} color={color} />
  );
};

export default NavigationIcon;
