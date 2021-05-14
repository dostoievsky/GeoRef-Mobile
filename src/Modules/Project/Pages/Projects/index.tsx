import React, { useEffect, useState } from 'react';

import {useProject} from '../../Hooks/Project';

import ProjecstPreview from '../../Components/ProjectPreview';

import {useNavigation} from '@react-navigation/native';

import {
  Container,
  ProjectsHeaderDates,
  OptionsButtons,
  OptionsButtonsText,
  OptionsContainer,
} from './styles';

const Project: React.FC = () => {
  const navigation = useNavigation();
  const {getProjects, projects} = useProject();
  const [hasProjects, setHasProjects] = useState<boolean>(false);

  useEffect(() => {
      getProjects();
      console.log(projects.length);
      if (projects.length > 0) {
        setHasProjects(true);
      }
  }, [getProjects]);

  return (
    <Container>
      <OptionsContainer>
        <OptionsButtons onPress={()=>{
            navigation.navigate('Start');
          }}>
            <OptionsButtonsText>INICIO</OptionsButtonsText>
        </OptionsButtons>

            <OptionsButtonsText>MEUS PROJETOS</OptionsButtonsText>
      </OptionsContainer>

      <ProjectsHeaderDates/>

      { hasProjects?
          projects.map((project) => {
            <ProjecstPreview
              name={project.name}
              id={project.id}
              description={project.description}
            />
          })
      :
        <OptionsButtonsText>
          Ainda não existem projetos dentro desse periodo.
        </OptionsButtonsText>
      }





    </Container>
  )
}

export default Project;
