import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 50px 20px;
`;

export const OptionsContainer = styled.View`
  position: absolute;
  flex-direction: row;
  margin-top: 10px;
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
  margin: 0 100px 10px 0;
`;

export const OptionsButtonsText = styled.Text`
  color: #000000;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
`;

export const ProjectsHeaderDates = styled.View`
  width: 95%;
  height: 50px;
  border: 4px;
  border-radius: 100px;
  border-color: #374;
`;



