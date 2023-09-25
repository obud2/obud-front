import axios from 'axios';
import { GOOGLE_MAP_API, GOOGLE_MAP_KEY } from 'src/constants';

const getCoordinates = (addr) => {
  return new Promise((resolve, reject) => {
    try {
      axios.get(`${GOOGLE_MAP_API}/geocode/json?address=${encodeURI(addr)}&key=${GOOGLE_MAP_KEY}`).then((res) => {
        if (res.data.status === 'OK') {
          resolve({
            region: res.data.results[0].address_components[1]?.long_name,
            lat: res.data.results[0].geometry.location.lat,
            lon: res.data.results[0].geometry.location.lng,
          });
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const GoogleMapService = {
  getCoordinates,
};

export default GoogleMapService;
