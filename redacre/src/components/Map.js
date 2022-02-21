import React, { useRef, useEffect, useState, useCallback }  from 'react';
import './Map.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useStream } from 'react-fetch-streams';

mapboxgl.accessToken = 'pk.eyJ1IjoiZWt1bWFtYWl0IiwiYSI6ImNremNyYW9ndTAwMTQydm8wd3hzd2dzemUifQ.ql5lo-vpdC8ynx2DfZgNKA';

const Map = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(14.4064);
    const [lat, setLat] = useState(35.3651);
    const [zoom, setZoom] = useState(11.00);

    const onNext = useCallback(async res => {
        const data = await res.json();
        setLng(data.lng);
        setLat(data.lat);
    }, [setLng, setLat]);
    useStream('http://localhost:5000/api/v1/location', {onNext});

    useEffect(() => {
      if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
      });
    });

    useEffect(() => {
      if (!map.current) return; // wait for map to initialize
      map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });
    });

  return (
    <div>
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default Map;
