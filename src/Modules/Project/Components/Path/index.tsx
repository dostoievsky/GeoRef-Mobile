import React, { useEffect } from 'react';

import {
  Polyline,
} from "react-native-maps";

import {coordenatesProps} from '../../Hooks/Location';

interface PathProps{
  path: coordenatesProps[];
}

const Path: React.FC<PathProps> = ({path}) => {
  //console.log(path, 'path');
  return (
    <Polyline
      coordinates={
        path
      }

      geodesic = {true}
      strokeColor = {'#6F9F77'}
      strokeWidth = {6}
    />
  );
}

export default Path;
