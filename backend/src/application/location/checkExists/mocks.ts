import { CheckLocationExists } from '.'
import { IcheckLocationExistsInfra, ICheckLocationExistsParams } from '../../../domain/location/protocols'
import { errorType } from '../../errorHandling/protocols'
import { Error500 } from '../../errorHandling/useCases/error500'

export class CheckLocationExistsMock implements IcheckLocationExistsInfra {
  exists: boolean

  constructor (exists: boolean) {
    this.exists = exists
  }

  async check (data: ICheckLocationExistsParams): Promise<boolean | errorType> {
    return Promise.resolve(this.exists)
  }
}

interface makeSutTypes {
  locationExists: boolean
}

export const makeSut = (data: makeSutTypes) => {
  const checkLocationExistsMocked = new CheckLocationExistsMock(data.locationExists)
  const error500 = new Error500()
  const sut = new CheckLocationExists(error500, checkLocationExistsMocked)
  return {
    sut, checkLocationExistsMocked, error500
  }
}
