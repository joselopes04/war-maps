import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import '@maplibre/maplibre-gl-leaflet';
import { filterByDate, dateRangeFromISODate } from '@openhistoricalmap/maplibre-gl-dates';


const Home = () => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);

    const addPoly = () => {
        const map = mapRef.current;
        const polygonCoordinates = [
            [39, -0.09], // LatLng point 1
            [51.51, -0.1],  // LatLng point 2
            [51.51, -0.12], // LatLng point 3
            [39, -0.09] // LatLng point 4 (same as point 1 to close the polygon)
        ];

        const polygon = L.polygon(polygonCoordinates, {
            color: 'blue',    // Color of the polygon outline
            fillColor: 'blue', // Fill color of the polygon
            fillOpacity: 0.5, // Opacity of the fill
            weight: 2         // Width of the outline
        }).addTo(map);
    }

    const addMarkers = (flag, coords, name, size) => {
        const map = mapRef.current;

        const customIcon = L.icon({
            iconUrl: flag,
            iconSize: size,
        });

        L.marker(coords, { icon: customIcon })
            .addTo(map)
            .bindPopup(name);
    };

    const addArrow = (coords, rotation) => {
        const map = mapRef.current;

        const customIcon = L.icon({
            iconUrl: '/images/redArrow.svg',
            iconSize: [21, 21],
        });

        const marker = L.marker(coords, { icon: customIcon })
            .addTo(map)
            .bindPopup("Direction of attack");

    };

    useEffect(() => {

        const map = L.map(mapContainerRef.current).setView([40, -120], 3);
        mapRef.current = map;

        const gl = L.maplibreGL({
            style: 'https://www.openhistoricalmap.org/map-styles/main/main.json',
            attributionControl: '<a href="https://www.openhistoricalmap.org/">OpenHistoricalMap</a>'
        }).addTo(map);

        const maplibreMap = gl.getMaplibreMap();
        console.log(maplibreMap)

        maplibreMap.once('styledata', function (event) {
            filterByDate(maplibreMap, '1939-08-31');
        });

        // Add nations
        addMarkers("https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flag_of_Germany_%281935%E2%80%931945%29.svg/1200px-Flag_of_Germany_%281935%E2%80%931945%29.svg.png", [52.518678928835755, 13.376176468301741], "Nazi Germany", [31, 21]);
        addMarkers("https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_Poland_%281928%E2%80%931980%29.svg/1200px-Flag_of_Poland_%281928%E2%80%931980%29.svg.png", [52.22531377967117, 21.028126138815217], "Poland", [31, 21]);
        addMarkers("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_Soviet_Union.svg/1200px-Flag_of_the_Soviet_Union.svg.png", [55.75060316924369, 37.6153173584575], "USSR", [31, 21]);
        addMarkers("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/383px-Flag_of_the_United_Kingdom_%281-2%29.svg.png", [51.50005911412233, -0.12448366423047506], "UK", [31, 21]);

        //Add Ports
        addMarkers("https://static.thenounproject.com/png/4417-200.png", [54.321, 10.134], "Kiel Naval Base", [21, 21]);
        addMarkers("https://static.thenounproject.com/png/4417-200.png", [53.521, 8.106], "Wilhelmshaven Naval Base", [21, 21]);

        addMarkers("https://static.thenounproject.com/png/4417-200.png", [53.521, 8.106], "Wilhelmshaven Naval Base", [21, 21]);

        addArrow([49, 8.106], 90);

        //addPoly()

        return () => {
            map.remove();
        };
    }, []);

    return (
        <div ref={mapContainerRef} style={{ width: '100%', height: '95vh' }} />
    );
};

export default Home;