import React, { useEffect, useState } from 'react';

import { SProductMap } from './ProductMap.styled';

import GoogleMap from '@components/googleMap/GoogleMap';
import { getCoordinates } from '@/service/GoogleMapService';

const ProductMap = ({ addr }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [coord, setCoord] = useState({
    lat: '',
    lon: '',
    region: '',
  });

  useEffect(() => {
    if (addr) {
      getCoordinates(addr).then((res) => {
        setCoord(res);
        setIsLoading(false);
      });
    }
  }, [addr]);

  return (
    <SProductMap>
      {/* Google Map */}
      {!isLoading && <GoogleMap lat={coord?.lat || ''} lon={coord?.lon || ''} zoom={16} />}
    </SProductMap>
  );
};

export default ProductMap;
