import { CheckUserExists } from '.'
import { IcheckUserExistsInfra } from '../../../domain/user/protocols'
import { errorType } from '../../errorHandling/protocols'
import { Error500 } from '../../errorHandling/useCases/error500'

class CheckUserExistsInfra implements IcheckUserExistsInfra {
  exists: boolean
  constructor (exists: boolean) {
    this.exists = exists
  }

  async check (id: number): Promise<boolean | errorType> {
    return Promise.resolve(this.exists)
  }
}

interface makeSutTypes {
  userExists:boolean
}

export const makeSut = (data: makeSutTypes) => {
  const error500 = new Error500()
  const checkUserExistsInfra = new CheckUserExistsInfra(data.userExists)
  const sut = new CheckUserExists(error500, checkUserExistsInfra)

  return {
    sut,
    checkUserExistsInfra,
    error500
  }
}
