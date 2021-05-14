import React from 'react';

import { AuthProvider } from '../Modules/Auth/Hooks/Auth';

import { LocationProvider } from '../Modules/Project/Hooks/Location';
import { MarkProvider } from '../Modules/Project/Hooks/Mark';
import { ProjectProvider } from '../Modules/Project/Hooks/Project';

const AppProvider: React.FC = ({ children }) => {
  return (
      <AuthProvider>
        {children}
      </AuthProvider>
  );
};

const MapProvider: React.FC = ({ children }) => {
  return (
      <LocationProvider>
        <MarkProvider>
          <ProjectProvider>
            {children}
          </ProjectProvider>
        </MarkProvider>
      </LocationProvider>
  );
};

export {AppProvider, MapProvider};
