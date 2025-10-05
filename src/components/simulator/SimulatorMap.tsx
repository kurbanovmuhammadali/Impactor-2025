import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ImpactParams, ImpactResults } from "@/lib/impactPhysics";

interface SimulatorMapProps {
  params: ImpactParams;
  results: ImpactResults | null;
  setParams: (params: ImpactParams) => void;
}

export const SimulatorMap = ({ params, results, setParams }: SimulatorMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current).setView([params.lat, params.lon], 5);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
    }).addTo(map);

    layersRef.current = L.layerGroup().addTo(map);

    map.on("click", (e) => {
      setParams({
        ...params,
        lat: parseFloat(e.latlng.lat.toFixed(2)),
        lon: parseFloat(e.latlng.lng.toFixed(2)),
      });
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !layersRef.current) return;

    layersRef.current.clearLayers();

    L.marker([params.lat, params.lon]).addTo(layersRef.current);
    mapRef.current.setView([params.lat, params.lon], mapRef.current.getZoom());

    if (results) {
      // Thermal radiation circle
      L.circle([params.lat, params.lon], {
        radius: parseFloat(results.thermalRadKm) * 1000,
        color: "#ff9f0a",
        fillColor: "#ff9f0a",
        fillOpacity: 0.2,
        weight: 1,
        dashArray: "5, 5",
      })
        .addTo(layersRef.current)
        .bindPopup(`<b>Thermal Burn Radius:</b> ${results.thermalRadKm} km`);

      // Crater circle
      if (!results.isWater && parseFloat(results.craterDiamKm) > 0) {
        L.circle([params.lat, params.lon], {
          radius: (parseFloat(results.craterDiamKm) * 1000) / 2,
          color: "#ff453a",
          fillColor: "#ff453a",
          fillOpacity: 0.5,
          weight: 2,
        })
          .addTo(layersRef.current)
          .bindPopup(`<b>Crater Diameter:</b> ${results.craterDiamKm} km`);
      }

      L.marker([params.lat, params.lon])
        .addTo(layersRef.current)
        .bindPopup("<b>💥 Impact Point</b>")
        .openPopup();
    }
  }, [params.lat, params.lon, results]);

  return (
    <div className="space-y-2">
      <div
        ref={mapContainerRef}
        className="w-full h-64 rounded-xl overflow-hidden border border-primary/20 glow-border"
      />
      <p className="text-xs text-muted-foreground text-center">
        ℹ️ Area sizes may appear distorted on flat map, especially near poles
      </p>
    </div>
  );
};
