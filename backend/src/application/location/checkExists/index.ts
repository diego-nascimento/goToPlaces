import { IcheckLocationExists, IcheckLocationExistsInfra, ICheckLocationExistsParams } from '../../../domain/location/protocols'
import { errorType, IError } from '../../errorHandling/protocols'

export class CheckLocationExists implements IcheckLocationExists {
  private readonly createError500: IError
  private readonly checkLocationExists: IcheckLocationExistsInfra

  constructor (createError500: IError, checkLocationExists: IcheckLocationExistsInfra) {
    this.createError500 = createError500
    this.checkLocationExists = checkLocationExists
  }

  async check (data: ICheckLocationExistsParams): Promise<boolean | errorType> {
    try {
      return await this.checkLocationExists.check(data)
    } catch (error) {
      return error instanceof Error && error.message !== ''
        ? this.createError500.createError(error.message)
        : this.createError500.createError('Something went wrong')
    }
  }
}
