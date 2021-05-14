import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';

import MapView, {
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";

interface mapProps{
  mapRef?: React.RefObject<MapView>;
  children?: React.ReactNode;
}

const Map: React.FC<mapProps> = ({mapRef, children}) => {
  const [latitude, setLatitude] = useState(-20.398259);
  const [longitude, setLongitude] = useState(-43.507726);

  const handleRegionChanged = useCallback((region: Region) => {
    setLatitude(region.latitude);
    setLongitude(region.longitude);
  }, []);

  return (
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            onRegionChangeComplete={handleRegionChanged}
            showsUserLocation={true}
            showsMyLocationButton={false}
            toolbarEnabled={false}

            style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
            }}

            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 0.195,
              longitudeDelta: 0.1921,
            }}
          >
            {children}
          </MapView>

  );
}

export default Map;
