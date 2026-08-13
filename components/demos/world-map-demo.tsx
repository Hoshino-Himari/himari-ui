"use client";

import { WorldMap } from "@/components/ui/world-map";

const connections = [
  {
    start: { lat: 25.033, lng: 121.5654, label: "台北" },
    end: { lat: 35.6762, lng: 139.6503, label: "東京" },
  },
  {
    start: { lat: 25.033, lng: 121.5654, label: "台北" },
    end: { lat: 1.3521, lng: 103.8198, label: "新加坡" },
  },
  {
    start: { lat: 25.033, lng: 121.5654, label: "台北" },
    end: { lat: 37.7749, lng: -122.4194, label: "舊金山" },
  },
  {
    start: { lat: 37.7749, lng: -122.4194, label: "舊金山" },
    end: { lat: 51.5074, lng: -0.1278, label: "倫敦" },
  },
  {
    start: { lat: 51.5074, lng: -0.1278, label: "倫敦" },
    end: { lat: -33.8688, lng: 151.2093, label: "雪梨" },
  },
];

export default function WorldMapDemo() {
  return (
    <div className="w-full px-6 py-6">
      <WorldMap
        connections={connections}
        lineColor="oklch(80% 0.14 80)"
        dotColor="oklch(45% 0.03 265)"
      />
    </div>
  );
}
