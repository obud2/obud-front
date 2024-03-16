import useGeolocation from '@/hook/useGeolocation';
import { useEffect, useRef, useState } from 'react';

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

const ResearchIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 13C4.68542 13 3.14844 12.3703 1.88906 11.1109C0.629687 9.85156 0 8.31458 0 6.5C0 4.68542 0.629687 3.14844 1.88906 1.88906C3.14844 0.629687 4.68542 0 6.5 0C7.43437 0 8.32812 0.192833 9.18125 0.5785C9.53129 0.736742 9.86082 0.922979 10.1698 1.13721C10.6288 1.45541 11.375 1.15841 11.375 0.599931C11.375 0.268598 11.6436 0 11.9749 0H12.1875C12.6362 0 13 0.363769 13 0.8125V2.84375C13 4.41431 11.7268 5.6875 10.1562 5.6875H8.125C7.67627 5.6875 7.3125 5.32373 7.3125 4.875C7.3125 4.42627 7.67627 4.0625 8.125 4.0625H8.56563C9.52781 4.0625 10.0725 3.02819 9.27924 2.48359C9.17251 2.41032 9.06212 2.34079 8.94806 2.275C8.19677 1.84167 7.38075 1.625 6.5 1.625C5.14583 1.625 3.99479 2.09896 3.04688 3.04688C2.09896 3.99479 1.625 5.14583 1.625 6.5C1.625 7.85417 2.09896 9.00521 3.04688 9.95312C3.99479 10.901 5.14583 11.375 6.5 11.375C7.54271 11.375 8.48385 11.0771 9.32344 10.4812C9.99653 10.0036 10.5086 9.40405 10.8597 8.68267C11.0179 8.35759 11.333 8.125 11.6945 8.125C12.2515 8.125 12.6594 8.65544 12.4334 9.16448C12.0017 10.1366 11.351 10.9615 10.4812 11.6391C9.31667 12.5464 7.98958 13 6.5 13Z" fill="#009EF7" />
  </svg>
);

const Fallback = () => {
    return (
      <div style={{
        width: '100%',
        height: '100%',
      }}
      >
        <span className="icons svg-loading" />
      </div>
    );
};

const Map = () => {
    const [searchable, setSearchable] = useState(false);

    const { loaded, coordinates, error } = useGeolocation();
    const mapRef = useRef(null);

    const hanleSetAroundMarker = () => {
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

    const handleSetMap = () => {
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

        if (coordinates?.lat && coordinates.lng) {
            const marker = new window.naver.maps.Marker({
                position: new window.naver.maps.LatLng(coordinates.lat, coordinates.lng),
                map: mapRef.current,
                icon: {
                    content: '<span class="obud-current-marker" />',
                },
            });
        }

        window.naver.maps.Event.addListener(mapRef.current, 'center_changed', (e) => {
            setSearchable(true);
        });

        hanleSetAroundMarker();
    };

    const handleResearch = () => {
        setSearchable(false);
    };

    useEffect(() => {
        if (loaded) {
            handleSetMap();
        }
    }, [loaded]);

    useEffect(() => {
        if (error) {
            // alert('위치 정보 동의를 진행해 주세요.');
        }
    }, [error]);

    return (
      <div
        style={{
        flex: 1,
        width: 380,
    }}>
        {
            !loaded ? <Fallback /> : (
              <div
                id="obud-map"
                className="obud-map"
              >
                {
                    searchable &&
                    <div className="obud-research" onClick={handleResearch}><ResearchIcon /><span>현지도에서 재검색</span></div>
                }
              </div>
)
        }
      </div>
    );
};

export default Map;
