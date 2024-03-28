import { TimeValueMap } from '@/components/discover/filter-modal/filter-box/FilterSlider';
import { Place } from '@/entities/place';
import useGeolocation from '@/hook/useGeolocation';
import { SearchService } from '@/service/SearchService';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { createContext, PropsWithChildren, useMemo, useRef, useEffect, useState, useContext } from 'react';
import { useQuery } from 'react-query';
import { setTimeout } from 'timers';

const LocationSVG = `
<svg class="location-marker" width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2501_363)">
<path d="M7.17783 20.5763C1.12375 11.9368 0 11.0501 0 7.875C0 3.52574 3.58171 0 8 0C12.4183 0 16 3.52574 16 7.875C16 11.0501 14.8763 11.9368 8.82217 20.5763C8.42488 21.1413 7.57508 21.1412 7.17783 20.5763Z" fill="#344235"/>
</g>
<defs>
<clipPath id="clip0_2501_363">
<rect width="16" height="21" fill="white"/>
</clipPath>
</defs>
</svg>
`;

export enum DisplayType {
    LIST,
    MAP
  }

const MapContext = createContext<{
    searchable: boolean
    loaded: boolean
    research: () => void
    aroundSearch: () => void
    selectedPlace: Place | null
    type: DisplayType
    setType: (type: DisplayType) => void
    places: Place[]
    reset: () => void
    // eslint-disable-next-line @typescript-eslint/no-empty-function
}>({ research: () => {}, searchable: false, loaded: false, aroundSearch: () => {}, selectedPlace: null, type: DisplayType.MAP, setType: () => {}, places: [], reset: () => {} });

export const MapProvider = ({ children }: PropsWithChildren) => {
    const [selectedPlace, setSelectedPlace] = useState<null | Place>(null);

  const [type, setType] = useState<DisplayType>(DisplayType.MAP);

    const router = useRouter();
    // eslint-disable-next-line prefer-const
    let { categoryIds, date, startTime, endTime } = router.query;
    const removePlaces = useRef<any>([]);
    const [searchable, setSearchable] = useState(false);

    const [places, setPlaces] = useState<Place[] >([]);
    const { location: { loaded, coordinates, error }, onSuccess } = useGeolocation();
    const mapsRef = useRef<naver.maps.Map>();
    const initCoordinates = useRef<{lat: number, lng: number}>();

    const latitude = coordinates?.lat || 37.5634554;
    const longitude = coordinates?.lng || 127.0375937;

    if (!date) {
        date = format(new Date(), 'yyyy-MM-dd');
      }

      if (startTime) {
        startTime = TimeValueMap.find((item) => item.value === (startTime ? parseInt(startTime as string, 10) : 0))?.time.toString();
      }

      if (endTime) {
        endTime = TimeValueMap.find((item) => item.value === (endTime ? parseInt(endTime as string, 10) : 0))?.time.toString();
      }

    const { data: initPlaces } = useQuery(['aroundSearch', latitude, longitude, categoryIds, startTime, endTime, date], () =>
    SearchService.aroundSearch({ categoryIds: categoryIds as string[], date: date as string, startTime: startTime as string, endTime: endTime as string, latitude, longitude }),
    );

    const setAroundMarker = () => {
       removePlaces.current = places?.map((position) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const marker = new window.naver.maps.Marker({
                position: new window.naver.maps.LatLng(position.latitude, position.longitude),
                map: mapsRef.current,
                icon: {
                    content: `<div class="obud-marker">
                        ${LocationSVG}
                        <span class="obud-marker-title">${position.title}</span>
                    </div>`,
                },
            });

            window.naver.maps.Event.addListener(marker, 'click', () => {
                setSelectedPlace(position);
            });

            return marker;
        });
    };

    const removeAroundMarker = () => {
        removePlaces.current?.forEach((marker) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            marker.setMap(marker);
        });
    };

    const init = () => {
        const location = {
            lat: coordinates?.lat || 37.5634554,
            lng: coordinates?.lng || 127.0375937,
        };

        const mapOptions = {
            center: new window.naver.maps.LatLng(location.lat, location.lng),
            zoom: 11,
            scaleControl: true,
        };

        mapsRef.current = new window.naver.maps.Map('obud-map', mapOptions);

        if (coordinates?.lat && coordinates?.lng) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const marker = new window.naver.maps.Marker({
                position: new window.naver.maps.LatLng(coordinates.lat, coordinates.lng),
                map: mapsRef.current,
                icon: {
                    content: '<span class="obud-current-marker" />',
                },
            });

            initCoordinates.current = {
                lat: coordinates.lat,
                lng: coordinates.lng,
            };
        }

        window.naver.maps.Event.addListener(mapsRef.current, 'center_changed', () => {
            setSearchable(true);
        });
    };

    const aroundSearch = () => {
        if (!error && mapsRef.current && initCoordinates.current) {
            const position = window.naver.maps.LatLng({
                lat: initCoordinates.current?.lat,
                lng: initCoordinates.current?.lng,
            });

            mapsRef.current.panTo(
                position,
            );
        }

        setSearchable(false);
    };

    const research = () => {
        setSearchable(false);

        const center = mapsRef.current?.getCenter();

        if (center?.x && center?.y) {
            onSuccess({ coords: { latitude: center?.y, longitude: center?.x } });
        }
    };

    useEffect(() => {
        setAroundMarker();
    }, [places]);

    useEffect(() => {
        removeAroundMarker();

        if (initPlaces?.value) {
            setPlaces(initPlaces.value);
        }
    }, [initPlaces]);

    useEffect(() => {
        if (loaded) {
            init();
        }
    }, [loaded]);

    const reset = () => {
        setTimeout(() => {
            init();
            setAroundMarker();
        }, 100);
    };

    const value = useMemo(
        () => ({
            searchable,
            loaded,
            research,
            aroundSearch,
            selectedPlace,
            type,
            setType,
            places,
            reset,
        }),
        [research, searchable, loaded, aroundSearch, selectedPlace, type, setType, places],
      );

    return (<MapContext.Provider value={value}>{children}</MapContext.Provider>);
};

export const useMap = () => {
    return useContext(MapContext);
};
