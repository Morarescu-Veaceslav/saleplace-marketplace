'use client'

import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'
interface Props {
  center: [number, number]
}

export function SessionMap({ center }: Props) {
  return (
    <YMaps>
      <div style={{ width: '100%', height: '300px' }}>
        <Map
          defaultState={{ center, zoom: 11 }}
          width="100%"
          height="100%"
        >
          <Placemark geometry={center} />
        </Map>
      </div>
    </YMaps>
  )
}