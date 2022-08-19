
export type locationType = {
  latitude: number
  longitude: number
  name: string
}

export interface newEventEntryType {
  name: string
  location: locationType
  price: number
  responsable: string
}

export interface EventType extends newEventEntryType {
  id: string
  created_At: Date
  updated_At: Date
}
