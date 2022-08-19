import { CreateLocationApplication } from '.'
import { locationType, newLocationType } from '../../../domain/location/model'
import { IcheckLocationExists, ICheckLocationExistsParams, IcreateLocationInfra } from '../../../domain/location/protocols'
import { errorType } from '../../errorHandling/protocols'
import { Error409 } from '../../errorHandling/useCases/error409'
import { Error500 } from '../../errorHandling/useCases/error500'

class CheckLocationExists implements IcheckLocationExists {
  response: boolean

  constructor (response: boolean) {
    this.response = response
  }

  async check (data: ICheckLocationExistsParams): Promise<boolean> {
    return Promise.resolve(this.response)
  }
}

const makeLocation = (): locationType => {
  return {
    id: 123,
    latitude: 123,
    longitude: 123,
    name: 'any',
    photos: []
  }
}

class CreateLocationInfra implements IcreateLocationInfra {
  async create (data: newLocationType): Promise<locationType | errorType> {
    return makeLocation()
  }
}

interface makeSutTypes {
  locationExists: boolean
}

export const makeSut = (data: makeSutTypes) => {
  const newLocationMocked: newLocationType = {
    latitude: 123,
    longitude: 123,
    name: 'any',
    photos: []
  }
  const error409 = new Error409()
  const error500 = new Error500()
  const createLocationInfra = new CreateLocationInfra()
  const checkLocationExists = new CheckLocationExists(data.locationExists)
  const sut = new CreateLocationApplication(checkLocationExists, error409, error500, createLocationInfra)
  return { sut, checkLocationExists, newLocationMocked, error409, error500, makeLocation, createLocationInfra }
}
