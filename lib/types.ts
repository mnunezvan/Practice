export interface Room {
  id: string
  nombre: string
  lat: number
  lng: number
  ocupacion: number
  capacidad: number
  nivelSilencio: string // 'high', 'medium', 'low'
  tamano: string // 'small', 'medium', 'large'
  enchufes: boolean
  iluminacion: string // 'good', 'regular', 'poor'
  serviciosCercanos: string[] // ['Baños', 'Cafetería', etc.]
}
