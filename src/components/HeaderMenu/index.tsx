import React, { useCallback, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import {useNavigation} from '@react-navigation/native';

import {useLocation} from '../../Modules/Project/Hooks/Location';

import { ButtomContainer } from './styles';

const HeaderMenu: React.FC = ({}) => {
  const {changeControlState} = useLocation();
  const [menu, setMenu] = useState(false);
  const navigation = useNavigation();

  const handleMenuOptions = useCallback(async() => {
    if (menu) {
      setMenu(!menu);
      navigation.goBack();
    }else{
      setMenu(!menu);
      changeControlState();
      navigation.navigate("Profile");
    }
  }, [navigation, menu]);

  return (
    <ButtomContainer
      onPress={() => {
        handleMenuOptions();
      }}
    >
      <Icon
        name="menu"
        size={30}
        color="#ffffff"
      />
    </ButtomContainer>
  );
};

export default HeaderMenu;
