import React, {
  useState,
  createContext,
  useCallback,
  useContext,
  useEffect
} from 'react';

import { requestMultiple, PERMISSIONS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import { Platform, Alert } from 'react-native';

export interface coordenatesProps{
  latitude: number;
  longitude: number;
}

interface ContextProps {
  coords: coordenatesProps;
  points: coordenatesProps[];
  controler: boolean;
  changeControlState(): void;
}

const LocationContext = createContext<ContextProps>({} as ContextProps);

const LocationProvider: React.FC = ({ children }) => {
    const [controler, setControler] = useState(false);
    const [coords, setCoords] = useState<coordenatesProps>({} as coordenatesProps);
    const [points, setPoints] = useState<coordenatesProps[]>([]);

    const changeControlState = useCallback(() => {
      setControler(!controler);
    }, [setControler, controler]);

    const loadPosition = useCallback(async () => {
      const result = requestMultiple(
        [
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION
        ]).then(
          (statuses) => {
            const statusFine = statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION];
            const statusBack = statuses[PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION];
            if (Platform.Version < 29) {
              if (statusFine == 'granted') {
                return true;
              } else {
                Alert.alert("Ops!", "Permissão de acesso a localização negada.");
              }
            }
            if (statusFine == 'granted' && statusBack == 'granted') {
              return true;
            } else {
              Alert.alert("Ops!", "Permissão de acesso a localização negada.");
            }
          },
        );
      if (result) {
         Geolocation.getCurrentPosition(
          ({ coords }) => {
            setCoords({
              latitude: coords.latitude,
              longitude: coords.longitude,
            });

            if (controler) {
              const newPoint =
              {
                latitude: coords.latitude,
                longitude: coords.longitude,
              }

                if (points[points.length-1] != newPoint) {
                  setPoints((state) => [...state, newPoint]);
                }
            }

          }, () => {
            Alert.alert('Não foi possível obter a localização');
          }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, showLocationDialog: true, }
        );
      }

    }, [coords, points, controler]);

    useEffect(() => {
      const timer = setTimeout(() => {
        loadPosition();
      }, 10000);
      return () => {
        clearTimeout(timer);
      };
    }, [loadPosition, coords, points, setTimeout, clearTimeout]);

    return (
      <LocationContext.Provider
        value={{
          coords,
          points,
          controler,
          changeControlState,
        }}
      >
        {children}
      </LocationContext.Provider>
    );
  }

  function useLocation(): ContextProps {
    const context = useContext(LocationContext);

    if (!context) {
      throw new Error('useLocation must be used within an LocationProvider');
    }
    return context;
  }


export { LocationProvider, useLocation };


