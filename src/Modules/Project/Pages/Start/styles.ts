import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  align-content: center;
  padding: 10px 0;
`;

export const OptionsContainer = styled.View`
  position: absolute;
  flex-direction: row;
  background: #fff;
  margin-left: 30px;
  width: 100%;
  padding: 10px 0 0 0;
`;


export const OptionsButtons = styled.TouchableOpacity`
  left: 0;
  bottom: 0;
  right: 0;
  background: transparent;
  border-top-width: 1px;
  border-color: transparent;
  flex-direction: row;
  margin: 0 0 0 80px;
  margin-bottom: 20px;
`;

export const OptionsButtonsText = styled.Text`
  color: #000000;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
`;

export const StartButtonContainer = styled.TouchableOpacity`
  align-items: center;
  align-content: center;
  width: 150px;
  height: 150px;
  border-radius: 98px;
  background: #374;
  margin-left: 30%;
  margin-bottom: 50px;
`;

export const StartButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  margin-top: 40%;
`;


