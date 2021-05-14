import React,
{
  createContext,
  useContext,
  useCallback,
  useState,
} from 'react';

import api from '../../../services/API';

import {useAuth} from '../../Auth/Hooks/Auth';

import {coordenatesProps} from './Location';
import {markerProps} from './Mark';

export interface projectProps {
  name: string;
  id: string;
  description: string;
  path?: coordenatesProps[];
  points?: markerProps[];
}

interface projectContextData{
  projects: projectProps[];
  getProjects(): Promise<void>;
}

const ProjectContext = createContext<projectContextData>({} as projectContextData);

const ProjectProvider: React.FC = ({ children }) => {
  const [projects, setProjects] = useState<projectProps[]>([]);
  //const [project, setProject] = useState<projectProps>();

  const {token} = useAuth();

  const addProject = useCallback(async(name, description: string) => {
  try {
    await api.post(
      'Project',
      {
        name: name,
        description: description,
      },
      { headers: { authorization: `bearer ${token}` } },
    ).then((Response) => {
      console.log(Response, 'resOnCreate');
    });
  }catch(err){
    console.log(err);
  }
}, [api, token]);

  const getProject = useCallback(() => {

  }, []);

  const getProjects = useCallback(async () => {
    try {
        await api.get(
          'allProjects',
          { headers: { authorization: `bearer ${token}` } },
        ).then((Response) => {
          if (Response.data.lenght > 0) {
            setProjects((state) => [...state, Response.data]);
            console.log(projects);
          }
        });
      }catch(err){
        console.log(err);
      }
  }, [api, token]);

  const deleteProject = useCallback(() => {

  }, []);

  const updateProject = useCallback(() => {

  }, []);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        getProjects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}


function useProject(): projectContextData {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}

export { ProjectProvider, useProject };
