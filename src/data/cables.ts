export interface CableEndpoint {
  anchor: string
  x: number
  y: number
}

export interface CableStyle {
  color: string
  width: number
  shadowColor: string
  highlightColor: string
}

export interface CableConfig {
  id: string
  from: CableEndpoint
  to: CableEndpoint
  tension: number
  sweep: number
  style: CableStyle
}

const YELLOW_TUBE: CableStyle = {
  color: '#FFD700',
  width: 14,
  shadowColor: '#7A5F00',
  highlightColor: '#FFFBE0',
}

export const CABLES: CableConfig[] = [
  {
    id: 'hero-to-demo',
    from: { anchor: 'hero-device', x: 0.5, y: 1.0 },
    to: { anchor: 'demo-device', x: 0.5, y: 0.0 },
    tension: 100,
    sweep: -50,
    style: YELLOW_TUBE,
  },
  {
    id: 'demo-to-multicam',
    from: { anchor: 'demo-device', x: 0.5, y: 1.0 },
    to: { anchor: 'multicam-device', x: 0.25, y: 0.0 },
    tension: 300,
    sweep: 150,
    style: YELLOW_TUBE,
  },
  {
    id: 'multicam-to-workflows',
    from: { anchor: 'multicam-device', x: 0.25, y: 1.0 },
    to: { anchor: 'workflows-device', x: 0.75, y: 0.0 },
    tension: 350,
    sweep: -280,
    style: YELLOW_TUBE,
  },
  {
    id: 'workflows-to-pricing',
    from: { anchor: 'workflows-device', x: 0.75, y: 1.0 },
    to: { anchor: 'pricing-device', x: 0.6, y: 0.0 },
    tension: 400,
    sweep: 150,
    style: YELLOW_TUBE,
  },
]
