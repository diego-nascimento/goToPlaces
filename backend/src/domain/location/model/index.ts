import { ImageType } from '../../image/model'

export interface newLocationType {
  latitude: number
  longitude: number
  name: string
  photos: number[]
}

export interface locationType {
  id: number
  latitude: number
  longitude: number
  name: string
  photos: ImageType[]
}
