import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MAP_ATTRIBUTION, MAP_TILES } from './constants'
import type { MapViewProps } from './types'

/** Carte Leaflet : une bulle par commune avec le nombre de jardins (fond OpenStreetMap, nécessite internet). */
const MapView = ({ center, zoom, bubbles, activeId = null, radiusKm, onSelect }: MapViewProps) => {
  const host = useRef<HTMLDivElement>(null)
  const map = useRef<L.Map | null>(null)
  const layer = useRef<L.LayerGroup | null>(null)
  // Dernier gestionnaire de clic, lu par les marqueurs sans les recréer à chaque rendu.
  const select = useRef(onSelect)
  useEffect(() => { select.current = onSelect })

  useEffect(() => {
    if (!host.current) return
    const m = L.map(host.current, { scrollWheelZoom: false }).setView([center.lat, center.lon], zoom)
    L.tileLayer(MAP_TILES, { attribution: MAP_ATTRIBUTION, maxZoom: 18 }).addTo(m)
    layer.current = L.layerGroup().addTo(m)
    map.current = m
    return () => { m.remove(); map.current = null; layer.current = null }
    // La carte n'est créée qu'une fois : le centre et le zoom suivants sont appliqués par l'effet ci-dessous.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => { map.current?.setView([center.lat, center.lon], zoom) }, [center.lat, center.lon, zoom])

  useEffect(() => {
    const g = layer.current
    if (!g) return
    g.clearLayers()
    if (radiusKm) L.circle([center.lat, center.lon], { radius: radiusKm * 1000, color: 'var(--color-brand)', weight: 1, fillOpacity: 0.05, interactive: false }).addTo(g)
    for (const b of bubbles) {
      const size = 28 + Math.min(b.count, 20) * 1.5
      const marker = L.marker([b.lat, b.lon], {
        icon: L.divIcon({ className: `adj-bubble${b.id === activeId ? ' on' : ''}`, html: `<span>${b.count}</span>`, iconSize: [size, size] }),
        keyboard: true,
        title: `${b.label} : ${b.count} jardin${b.count > 1 ? 's' : ''}`,
      })
      marker.on('click', () => select.current(b.id))
      marker.addTo(g)
    }
  }, [bubbles, activeId, radiusKm, center.lat, center.lon])

  return <div ref={host} className="z-0 h-[320px] w-full overflow-hidden rounded-[10px] border border-line lg:h-full lg:min-h-[420px]" role="region" aria-label="Carte des jardins disponibles" />
}

export default MapView
