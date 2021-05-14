import styled from 'styled-components/native';
import {getBottomSpace} from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
`;

export const ProfileButton = styled.TouchableOpacity`

`;

export const UserAVatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  background: #374;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #000000;
  font-family: 'RobotoSlab-Medium';
  margin: 30px 0 24px;
`;

export const OptionsButtons = styled.TouchableOpacity`
  left: 0;
  bottom: 0;
  right: 0;
  background: transparent;
  border-top-width: 1px;
  border-color: transparent;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin: 5px 0 24px;
`;

export const OptionsButtonsText = styled.Text`
  color: #6F9F77;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`;


export const SingOutButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 10px;
  right: 0;
  background: transparent;
  border-top-width: 1px;
  border-color: transparent;
  padding: 16px 0 ${16 + getBottomSpace()}px;
  justify-content: center;
  align-items: center;
  flex-direction: row;


`;

export const SingOutButtonText = styled.Text`
  color: #FF6C01;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`;
