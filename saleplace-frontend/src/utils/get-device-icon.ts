import { Monitor, Smartphone, Tablet } from "lucide-react"

export function getDeviceIcon(type: string) {
  switch (type) {
    case 'desktop':
      return Monitor
    case 'mobile':
      return Smartphone
    case 'tablet':
      return Tablet
    default:
      return Monitor
  }
}