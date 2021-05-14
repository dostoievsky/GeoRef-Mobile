import React,
{
  createContext,
  useContext,
  useCallback,
  useState,
} from 'react';

import { v4 as uuid } from 'uuid';

import MarkerPoint from '../Components/markerPoint';

export interface markerProps {
  id: string;
  latitude: number;
  longitude: number;
  title?: string;
  description?: string;
}

interface MarkContextData{
  addMark(mark: Omit<markerProps, 'id'>): void;
  mapMarkers: markerProps[];
  //removeMark(id: string): void;
}

const MarkContext = createContext<MarkContextData>({} as MarkContextData);

const MarkProvider: React.FC = ({ children }) => {
  const [mapMarkers, setMapMarkers] = useState<markerProps[]>([]);

  const addMark = useCallback(({latitude, longitude}: Omit<markerProps, 'id'>)=>{
    const id = uuid();
    const title = `Marker${id}`;
    const mark = {
      id,
      latitude,
      longitude,
      title,
    };
    setMapMarkers((state) => [...state, mark]);
  },
  []);

  return (
    <MarkContext.Provider
      value={{
        addMark,
        mapMarkers,
      }}
    >
      {children}
      <MarkerPoint />
    </MarkContext.Provider>
  );
}

function useMark(): MarkContextData {
  const context = useContext(MarkContext);

  if (!context) {
    throw new Error('useMark must be used within a MarkProvider');
  }
  return context;
}

export { MarkProvider, useMark };
