import React from 'react';

import {useNavigation} from '@react-navigation/native';

import Map from '../../Components/Map';

import {
  Container,
  OptionsContainer,
  OptionsButtons,
  OptionsButtonsText,
  StartButtonContainer,
  StartButtonText,
} from './styles';

const Start: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <Map/>
      <Container>
        <OptionsContainer>
          <OptionsButtonsText>           INICIO</OptionsButtonsText>
          <OptionsButtons onPress={()=>{
              navigation.navigate('Projects');
            }}
          >
              <OptionsButtonsText>MEUS PROJETOS</OptionsButtonsText>
          </OptionsButtons>
        </OptionsContainer>
      </Container>
      <StartButtonContainer onPress={()=>{
          navigation.navigate('NewProject');
        }}
      >
        <StartButtonText>INICIAR</StartButtonText>
      </StartButtonContainer>
    </>
  )
}

export default Start;
