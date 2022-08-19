import { locationType } from '../../location/model'

export interface newEventEntryType {
  name: string
  location: number
  price: number
  responsable: number
}

export interface EventType {
  id: number
  price: number
  name: string
  location: locationType
}
