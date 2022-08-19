import { Location } from '../../../domain/location'
import { newLocationType, locationType } from '../../../domain/location/model'
import { IcheckLocationExists, IcreateLocation, IcreateLocationInfra } from '../../../domain/location/protocols'
import { errorType, IError } from '../../errorHandling/protocols'

export class CreateLocationApplication implements IcreateLocation {
  private readonly createLocation: IcreateLocationInfra
  private readonly checkLocationExists: IcheckLocationExists
  private readonly createError409: IError
  private readonly createError500: IError

  constructor (checkLocationExists: IcheckLocationExists, createError409: IError, createError500: IError, createLocation: IcreateLocationInfra) {
    this.checkLocationExists = checkLocationExists
    this.createError409 = createError409
    this.createError500 = createError500
    this.createLocation = createLocation
  }

  async create (data: newLocationType): Promise<locationType | errorType> {
    try {
      const location = new Location(data)
      const locationExists = await this.checkLocationExists.check({
        location: data
      })
      if (locationExists) return this.createError409.createError('Location already exists')
      const newLocation = await this.createLocation.create(location.asJSON())
      return newLocation
    } catch (error) {
      return error instanceof Error && error.message !== ''
        ? this.createError500.createError(error.message)
        : this.createError500.createError('Something went wrong')
    }
  }
}
