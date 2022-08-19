import { IcheckUserExists, IcheckUserExistsInfra } from '../../../domain/user/protocols'
import { errorType, IError } from '../../errorHandling/protocols'

export class CheckUserExists implements IcheckUserExists {
  private readonly createError500: IError
  private readonly checkUserExists: IcheckUserExistsInfra

  constructor (createError500: IError, checkUserExists: IcheckUserExistsInfra) {
    this.createError500 = createError500
    this.checkUserExists = checkUserExists
  }

  async check (id: number): Promise<boolean | errorType> {
    try {
      return await this.checkUserExists.check(id)
    } catch (error) {
      return error instanceof Error && error.message !== ''
        ? this.createError500.createError(error.message)
        : this.createError500.createError('Something went wrong')
    }
  }
}
