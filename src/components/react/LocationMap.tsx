import React, { useEffect, useState } from 'react';

const NAV_HREF = "https://www.google.com/maps/dir/?api=1&destination=50.0121,20.9858";

export function LocationMap() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        let map: any = null;

        const initMap = async () => {
            const container = document.getElementById('location-map');
            if (!container || (container as any)._leaflet_id) return;

            // @ts-ignore
            const L = await import('leaflet');

            const position: [number, number] = [50.0121, 20.9858];

            console.log("Initializing Leaflet map...");

            map = L.map('location-map', {
                center: position,
                zoom: 16,
                zoomControl: false,
                scrollWheelZoom: false,
                // Offset center slightly to account for the info card on the left
                paddingTopLeft: [320, 0],
            });

            L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 20
            }).addTo(map);

            // Zoom control bottom right
            L.control.zoom({ position: 'bottomright' }).addTo(map);

            // Custom marker
            const customIcon = L.divIcon({
                className: 'custom-location-icon',
                html: `
                    <div style="position:relative;display:flex;align-items:center;justify-content:center;width:48px;height:48px;">
                        <div style="position:absolute;width:48px;height:48px;background:rgba(234,88,12,0.15);border-radius:50%;animation:ping 2s cubic-bezier(0,0,0.2,1) infinite;"></div>
                        <div style="position:relative;width:20px;height:20px;background:#EA580C;border:3px solid white;box-shadow:0 4px 20px rgba(234,88,12,0.4);clip-path:polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);"></div>
                    </div>
                `,
                iconSize: [48, 48],
                iconAnchor: [24, 24],
            });

            L.marker(position, { icon: customIcon }).addTo(map);

            // Keep size in sync
            const resizeObserver = new ResizeObserver(() => map?.invalidateSize());
            resizeObserver.observe(container);

            setTimeout(() => map?.invalidateSize(), 100);
            setTimeout(() => map?.invalidateSize(), 500);
            setTimeout(() => map?.invalidateSize(), 1000);
        };

        initMap();

        return () => {
            if (map) map.remove();
        };
    }, [isMounted]);

    if (!isMounted) {
        return (
            <div className="w-full h-full bg-gray-50 animate-pulse flex items-center justify-center">
                <div className="font-mono text-[10px] text-slate-ink/20 uppercase tracking-widest font-black">
                    INITIALIZING_DATA_STREAM...
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-[500px] lg:h-[600px]">
            {/* Map renders full width/height */}
            <div id="location-map" className="absolute inset-0 z-10" />

            {/* Info card overlay — always visible, sits above map */}
            <div
                className="absolute top-0 left-0 bottom-0 z-20 w-[280px] lg:w-[300px] bg-white/95 backdrop-blur-sm flex flex-col justify-between p-6 lg:p-8"
                style={{ borderRight: '1px solid #E2E8F0', boxShadow: '4px 0 30px rgba(0,0,0,0.08)' }}
            >
                {/* Header */}
                <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-accent-orange font-black mb-4">
                        04 // LOKALIZACJA
                    </p>
                    <h3 className="text-xl font-black uppercase tracking-tight text-slate-ink leading-tight mb-1">
                        SZRAMADACH
                    </h3>
                    <p className="font-mono text-[10px] text-slate-ink/40 uppercase tracking-widest font-bold mb-6">
                        DEKARSTWO TARNÓW
                    </p>

                    <div className="space-y-3 text-sm text-slate-ink/70">
                        <div className="flex items-start gap-3">
                            <span className="font-mono text-accent-orange text-[9px] font-black uppercase mt-0.5 min-w-[36px]">ADR</span>
                            <span className="font-medium">ul. Krakowska 123<br />33-100 Tarnów</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="font-mono text-accent-orange text-[9px] font-black uppercase mt-0.5 min-w-[36px]">TEL</span>
                            <span className="font-medium">+48 500 123 456</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="font-mono text-accent-orange text-[9px] font-black uppercase mt-0.5 min-w-[36px]">HRS</span>
                            <span className="font-medium">Pon–Pt: 7:00–16:00<br />Sob: 7:00–12:00</span>
                        </div>
                    </div>
                </div>

                {/* Navigation CTA */}
                <div className="space-y-3">
                    <div className="h-[1px] bg-slate-ink/10 w-full" />
                    <a
                        href={NAV_HREF}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full bg-accent-orange text-white px-5 py-4 font-black uppercase tracking-widest text-[11px] hover:bg-slate-ink transition-colors duration-300 group"
                    >
                        <span>Otwórz w Mapach</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                    <p className="text-center font-mono text-[8px] text-slate-ink/30 uppercase tracking-widest">
                        Google Maps · Apple Maps · Waze
                    </p>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes ping {
                    75%, 100% { transform: scale(2); opacity: 0; }
                }
                .custom-location-icon {
                    background: none !important;
                    border: none !important;
                }
                #location-map {
                    width: 100%;
                    height: 100%;
                }
                .leaflet-container img {
                    max-width: none !important;
                    max-height: none !important;
                    display: block;
                }
                .leaflet-tile {
                    visibility: visible !important;
                }
                .leaflet-container {
                    background: #f0f0f0 !important;
                }
                .leaflet-control-container .leaflet-bottom {
                    bottom: 16px;
                    right: 16px;
                }
            `}} />
        </div>
    );
}
