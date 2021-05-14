import React from 'react';

import Icon from 'react-native-vector-icons/Feather';

import {projectProps} from '../../Hooks/Project';

import {
  Container,
  IconContainer,
  DateContainer,
  Title,
  InfoContainer,
  InfoProps,
  InfoText,
} from './styles';

const ProjectPreview: React.FC<projectProps> = (project) => {
  return (
    <Container>
      <IconContainer>
        <Icon name='map-pin' size={40} color='#EB5757'/>
      </IconContainer>

      <DateContainer>XX/YY/ZZZZ</DateContainer>
      <Title>Visita ao Caraça</Title>

      <InfoContainer>
        <InfoProps>XX</InfoProps>

        <InfoProps>YY</InfoProps>

        <InfoProps>           ZZh</InfoProps>
      </InfoContainer>

      <InfoContainer>
        <InfoText>Quilometros</InfoText>

        <InfoText>Pontos Marcados</InfoText>

        <InfoText>Duração</InfoText>
      </InfoContainer>

    </Container>
  )
}

export default ProjectPreview;
