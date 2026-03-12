import React, { useEffect, useRef } from "react";

// Tarnów coordinates
const TARNOW_LAT = 50.0121;
const TARNOW_LNG = 20.9858;
const RADIUS_M = 100_000; // 100 km in meters

// Key cities within the coverage area
const NEARBY_CITIES = [
    { name: "Tarnów", lat: 50.0121, lng: 20.9858, isCenter: true },
    { name: "Kraków", lat: 50.0647, lng: 19.9450 },
    { name: "Rzeszów", lat: 50.0413, lng: 21.9990 },
    { name: "Nowy Sącz", lat: 49.6233, lng: 20.6930 },
    { name: "Bochnia", lat: 49.9677, lng: 20.4321 },
    { name: "Dębica", lat: 50.0494, lng: 21.4124 },
    { name: "Mielec", lat: 50.2878, lng: 21.4318 },
    { name: "Brzesko", lat: 49.9715, lng: 20.6098 },
];

// Custom retro/technical tile URL - no API key needed
const TILE_URL = "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png";
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

export const CoverageMap: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);

    useEffect(() => {
        let isMounted = true;
        if (!mapRef.current || mapInstanceRef.current) return;

        // Dynamically import leaflet to avoid SSR issues
        import("leaflet").then((L) => {
            if (!isMounted) return;
            // Fix default icon paths for bundlers
            delete (L.Icon.Default.prototype as any)._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
                shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
            });

            const map = L.map(mapRef.current!, {
                center: [TARNOW_LAT, TARNOW_LNG],
                zoom: 8,
                zoomControl: false,
                attributionControl: false,
                scrollWheelZoom: false,
            });

            mapInstanceRef.current = map;

            // Monochrome tile layer
            L.tileLayer(TILE_URL, {
                attribution: ATTRIBUTION,
                subdomains: "abcd",
            }).addTo(map);

            // Attribution in bottom right
            L.control.attribution({ position: "bottomright", prefix: false }).addTo(map);

            // Custom zoom controls top right
            L.control.zoom({ position: "topright" }).addTo(map);

            // 100km radius circle — styled to match site accent
            const coverageCircle = L.circle([TARNOW_LAT, TARNOW_LNG], {
                radius: RADIUS_M,
                color: "#E65A00",
                fillColor: "#E65A00",
                fillOpacity: 0.07,
                weight: 2,
                dashArray: "8 6",
            }).addTo(map);

            // Center marker — Tarnów (custom styled)
            const centerIcon = L.divIcon({
                html: `
                    <div style="
                        width:16px;height:16px;
                        background:#E65A00;
                        border:3px solid #1B2740;
                        border-radius:50%;
                        box-shadow:0 0 0 4px rgba(230,90,0,0.25);
                    "></div>
                `,
                className: "",
                iconSize: [16, 16],
                iconAnchor: [8, 8],
            });

            // City markers
            const cityIcon = L.divIcon({
                html: `
                    <div style="
                        width:8px;height:8px;
                        background:#1B2740;
                        border:2px solid #E65A00;
                        border-radius:50%;
                    "></div>
                `,
                className: "",
                iconSize: [8, 8],
                iconAnchor: [4, 4],
            });

            NEARBY_CITIES.forEach((city) => {
                const icon = city.isCenter ? centerIcon : cityIcon;
                const marker = L.marker([city.lat, city.lng], { icon });

                const tooltipContent = city.isCenter
                    ? `<div style="
                            font-family:monospace;
                            font-size:10px;
                            font-weight:900;
                            text-transform:uppercase;
                            letter-spacing:0.1em;
                            color:#1B2740;
                            background:#fff;
                            border:1.5px solid #E65A00;
                            padding:4px 8px;
                            border-radius:2px;
                            white-space:nowrap;
                        ">⚑ ${city.name} — HQ</div>`
                    : `<div style="
                            font-family:monospace;
                            font-size:9px;
                            font-weight:700;
                            text-transform:uppercase;
                            letter-spacing:0.1em;
                            color:#1B2740;
                            background:#fff;
                            border:1px solid #ccc;
                            padding:3px 7px;
                            border-radius:2px;
                            white-space:nowrap;
                        ">${city.name}</div>`;

                marker.addTo(map).bindTooltip(tooltipContent, {
                    permanent: true,
                    direction: city.isCenter ? "top" : "right",
                    offset: city.isCenter ? [0, -12] : [6, 0],
                    opacity: 1,
                    className: "leaflet-tooltip-clean",
                });
            });

            // Fit the map to the circle bounds
            const circleBounds = coverageCircle.getBounds();
            map.fitBounds(circleBounds, { padding: [24, 24] });
        });

        return () => {
            isMounted = false;
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    return (
        <div
            ref={mapRef}
            style={{ width: "100%", height: "100%", minHeight: "460px" }}
        />
    );
};
