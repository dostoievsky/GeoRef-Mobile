import React, {
  useRef,
  useCallback,
  useState,
  useEffect,
} from 'react';

import {
  View,
  ActivityIndicator,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import MapView from "react-native-maps";

import Map from '../../Components/Map';

import NavigationIcon from '../../Components/navigationIcon';
import MarkerPoint from '../../Components/markerPoint';
import Path from '../../Components/Path';
import {useLocation} from '../../Hooks/Location';
import {useMark} from '../../Hooks/Mark';

interface routeControlProps {
  icon: 'play-circle' | 'stop-circle';
  color: '#b11111' | '#6F9F77';
}

import {
  Container,
  Loading,
  IconsContainer,
} from './styles';

const NewProject: React.FC = () => {
  const {addMark} = useMark();
  const mapRef = useRef<MapView>(null);
  const {coords, points, controler, changeControlState} = useLocation();
  const [routeState, setRouteState] = useState<routeControlProps>({icon: 'play-circle', color: '#b11111'});

  const navigation = useNavigation();

  const handleAddMark = useCallback(() => {
    addMark({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
    changeControlState();
    navigation.navigate('EditPoint');
  }, [addMark, coords, changeControlState, navigation]);

  const handleFocusUser = useCallback(() => {
    mapRef.current?.animateToRegion({
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
      ...coords,
    });
  }, [mapRef, coords]);

  const handleRouteControl = useCallback(() => {
    console.log('pressed hrC');
    changeControlState();
  }, [changeControlState]);

  const handleFinishProject = useCallback(() => {
    console.log('pressed hfP');
    changeControlState();
    navigation.navigate('FinishProject');
  }, [changeControlState, navigation]);

  useEffect(() => {
    if (controler) {
      setRouteState({icon: 'stop-circle', color: '#6F9F77'});
    }else{
      setRouteState({icon: 'play-circle', color: '#b11111'});
    }
  }, [controler, setRouteState]);

  return (
    <>
      {!coords ? (
        <Container>
          <View>
            <ActivityIndicator size="large" color={'#b11111'} />
            <Loading>Carregando o mapa...</Loading>
          </View>
        </Container>
      ) : (
        <>
          <Map mapRef={mapRef}>
            <Path path={points}/>
            <MarkerPoint/>
          </Map>

          <IconsContainer onPress={handleAddMark} >
            <NavigationIcon size={50} name={'target'} color={'#b11111'}/>
          </IconsContainer>

          <IconsContainer onPress={handleFocusUser}>
            <NavigationIcon size={50} name={'compass'} color={'#b11111'}/>
          </IconsContainer>

          <IconsContainer onPress={handleRouteControl}>
            <NavigationIcon size={50} name={routeState.icon} color={routeState.color}/>
          </IconsContainer>

          <IconsContainer onPress={handleFinishProject}>
            <NavigationIcon size={50} name={'check-circle'} color={'#FF6C01'}/>
          </IconsContainer>

        </>
      )}
    </>
  );
}

export default NewProject;
