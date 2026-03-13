import React, { useEffect, useState } from 'react';

export function LocationMap() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        let map: any = null;

        const initMap = async () => {
            // Check if there is already a map instance on this element
            const container = document.getElementById('location-map');
            if (!container || (container as any)._leaflet_id) {
                console.log("Map container already initialized or not found.");
                return;
            }

            // @ts-ignore
            const L = await import('leaflet');
            
            // Tarnów coordinates
            const position: [number, number] = [50.0121, 20.9858];

            console.log("Initializing Leaflet map...");

            map = L.map('location-map', {
                center: position,
                zoom: 16,
                zoomControl: false,
                scrollWheelZoom: false
            });

            L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 20
            }).addTo(map);

            // Add zoom control to bottom right
            L.control.zoom({
                position: 'bottomright'
            }).addTo(map);

            // Custom technical-looking marker
            const customIcon = L.divIcon({
                className: 'custom-location-icon',
                html: `
                    <div class="relative flex items-center justify-center">
                        <div class="absolute w-12 h-12 bg-accent-orange/20 rounded-full animate-ping"></div>
                        <div class="relative w-6 h-6 bg-accent-orange border-4 border-white shadow-xl flex items-center justify-center">
                            <div class="w-1 h-1 bg-white"></div>
                        </div>
                    </div>
                `,
                iconSize: [48, 48],
                iconAnchor: [24, 24]
            });

            const marker = L.marker(position, { icon: customIcon }).addTo(map);
            
            marker.bindPopup(`
                    <div class="p-4 font-mono min-w-[200px]">
                        <p class="font-black text-slate-ink uppercase text-[11px] mb-1">SZRAMADACH DEKARSTWO</p>
                        <p class="text-[10px] text-slate-ink/60 mb-4">ul. Krakowska 123<br/>33-100 Tarnów</p>
                        <a 
                            href="https://www.google.com/maps/dir/?api=1&destination=50.0121,20.9858" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            class="block w-full text-center bg-accent-orange text-white py-2 text-[10px] font-black uppercase tracking-widest hover:bg-slate-ink transition-colors duration-300 rounded-sm"
                        >
                            NAWIGUJ
                        </a>
                    </div>
                `, {
                    offset: [0, -10],
                    className: 'technical-popup'
                })
                .openPopup();

            // Use ResizeObserver to keep map size in sync with container
            const resizeObserver = new ResizeObserver(() => {
                if (map) {
                    map.invalidateSize();
                }
            });
            resizeObserver.observe(container);

            // Multiple attempts to invalidate size (helps with transitions/reveals)
            setTimeout(() => map?.invalidateSize(), 100);
            setTimeout(() => map?.invalidateSize(), 500);
            setTimeout(() => map?.invalidateSize(), 1000);
        };

        initMap();

        return () => {
            if (map) {
                map.remove();
            }
        };
    }, [isMounted]);

    if (!isMounted) {
        return (
            <div className="w-full h-full bg-gray-50 animate-pulse flex items-center justify-center border border-sheet-border">
                <div className="font-mono text-[10px] text-slate-ink/20 uppercase tracking-widest font-black">
                    INITIALIZING_DATA_STREAM...
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-[500px] lg:h-[600px]">
            <div id="location-map" className="w-full h-full z-10" />
            
            {/* Global style for map and marker */}
            <style dangerouslySetInnerHTML={{ __html: `
                .custom-location-icon {
                    background: none !important;
                    border: none !important;
                }
                .leaflet-popup-content-wrapper {
                    border-radius: 0 !important;
                    border: 1px solid #D1D5DB !important;
                    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.1) !important;
                }
                .leaflet-popup-tip {
                    background: #FFFFFF !important;
                    border: 1px solid #D1D5DB !important;
                }
                #location-map {
                    min-height: 400px;
                    width: 100%;
                    position: relative;
                    z-index: 1;
                }
                /* Ensure Leaflet controls are visible */
                .leaflet-control-container {
                    z-index: 1000 !important;
                }
                .leaflet-tile-pane {
                    opacity: 1 !important;
                    visibility: visible !important;
                    z-index: 1 !important;
                }
                /* Fix Tailwind image reset breaking Leaflet tiles */
                .leaflet-container img {
                    max-width: none !important;
                    max-height: none !important;
                    display: block;
                }
                /* Ensure tiles have width/height and are visible */
                .leaflet-tile {
                    visibility: visible !important;
                }
                .leaflet-container {
                    background: transparent !important;
                }
                .leaflet-popup-content-wrapper {
                    border-radius: 0 !important;
                    border: 1px solid #E2E8F0 !important;
                    box-shadow: 10px 10px 0px rgba(0,0,0,0.05) !important;
                }
                .leaflet-popup-tip {
                    display: none !important;
                }
            `}} />
        </div>
    );
}
