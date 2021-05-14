/* src/Components/MarkerImpl */
//importando as dependências necessárias
import React from 'react';	//utilizando ícones personalizados
import {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';

import {useMark} from '../../Hooks/Mark';

const markerPoint: React.FC = () => {
  const {mapMarkers} = useMark();

  return (
  <>
    {mapMarkers.map((mark)=> (
      <Marker
        tracksViewChanges={false}	//propriedade que melhora muito a performance do nosso aplicativo, mantendo os marcadores fixados no mapa e eliminando a renderização continua.
        key = {mark.id}	//como temos vários marcadores, devemos adicionar um id para cada
        coordinate={{	//aqui nós inserimos a localização do marcador no mapa
          latitude:mark.latitude,
          longitude: mark.longitude,
        }}
        title={mark.title}	//título do marcador
      >
        <Icon
          name='map-pin'
          size={30}
          color='#6F9F77'
        />
      </Marker>
    ))}
  </>

  );
};

export default markerPoint;
