import useGeolocation from '@/hook/useGeolocation';
import { createContext, PropsWithChildren, useMemo, useRef, useEffect, useState, useContext } from 'react';

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

const MapContext = createContext<{
    searchable: boolean
    loaded: boolean
    research: () => void

    aroundSearch: () => void
    // eslint-disable-next-line @typescript-eslint/no-empty-function
}>({ research: () => {}, searchable: false, loaded: false, aroundSearch: () => {} });

export const MapProvider = ({ children }: PropsWithChildren) => {
    const [searchable, setSearchable] = useState(false);

    const { loaded, coordinates, error } = useGeolocation();
    const mapRef = useRef();
    const initCoordinates = useRef<{lat: number, lng: number}>();

    const setAroundMarker = () => {
        const positions = [
            {
                lat: 37.5620246,
                lng: 127.0382293,
                title: '해요요가',
            },
            {
                lat: 37.5640311,
                lng: 127.03898,
                title: '그린랩',
            },
        ];

        positions.forEach((position) => {
            const marker = new window.naver.maps.Marker({
                position: new window.naver.maps.LatLng(position.lat, position.lng),
                map: mapRef.current,
                icon: {
                    content: `<div class="obud-marker">
                        ${LocationSVG}
                        <span class="obud-marker-title">${position.title}</span>
                    </div>`,
                },
            });
        });
    };

    const init = () => {
        const location = {
            lat: coordinates?.lat || 37.5634554,
            lng: coordinates?.lng || 127.0375937,
        };
        const mapOptions = {
            center: new window.naver.maps.LatLng(location.lat, location.lng),
            zoom: 16,
            scaleControl: true,
        };

        mapRef.current = new window.naver.maps.Map('obud-map', mapOptions);

        if (coordinates?.lat && coordinates?.lng) {
            const marker = new window.naver.maps.Marker({
                position: new window.naver.maps.LatLng(coordinates.lat, coordinates.lng),
                map: mapRef.current,
                icon: {
                    content: '<span class="obud-current-marker" />',
                },
            });

            initCoordinates.current = {
                lat: coordinates.lat,
                lng: coordinates.lng,
            };
        }

        window.naver.maps.Event.addListener(mapRef.current, 'center_changed', (e) => {
            setSearchable(true);
        });

        setAroundMarker();
    };

    const aroundSearch = () => {
        console.log('around');
    };

    const research = () => {
        setSearchable(false);
        console.log('research');
    };

    useEffect(() => {
        if (loaded) {
            init();
        }
    }, [loaded]);

    const value = useMemo(
        () => ({
            searchable,
            loaded,
            research,
            aroundSearch,
        }),
        [research, searchable, loaded, aroundSearch],
      );

    return (<MapContext.Provider value={value}>{children}</MapContext.Provider>);
};

export const useMap = () => {
    return useContext(MapContext);
};
