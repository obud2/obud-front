import React from 'react';

import { GoogleMap as GMap, Marker, useJsApiLoader } from '@react-google-maps/api';

import { SGoogleMap } from './GoogleMap.styled';
import { GOOGEL_MAP_OPTION } from './GoogleMap.option';
import { GOOGLE_MAP_KEY } from 'src/constants';

/**
 *
 * @param {*} width
 * @param {*} height
 * @param {Number} lat
 * @param {Number} lon
 * @param {Number} zoom
 *
 * @returns
 */

const GoogleMap = ({ width, height, lat, lon, zoom = 11 }) => {
  const containerStyle = {
    width: width || '100%',
    height: height || '100%',
  };

  const center = {
    lat: Number(0),
    lng: Number(0),
  };

  const { isLoaded } = useJsApiLoader({
    language: 'KO',
    region: 'ko',
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAP_KEY,
  });

  return (
    <SGoogleMap>
      {isLoaded ? (
        <GMap
          options={GOOGEL_MAP_OPTION}
          mapContainerStyle={containerStyle}
          center={{ lat: Number(lat || 0), lng: Number(lon || 0) }}
          zoom={zoom}
        >
          <Marker position={lat ? { lat: Number(lat), lng: Number(lon) } : center} />
        </GMap>
      ) : (
        <div className="google-map-loaded" />
      )}
    </SGoogleMap>
  );
};

export default React.memo(GoogleMap);
