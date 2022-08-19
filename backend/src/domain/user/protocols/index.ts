import { errorType } from '../../../application/errorHandling/protocols'

export interface IcheckUserExists {
  check(id: number): Promise<boolean | errorType>
}

export interface IcheckUserExistsInfra {
  check(id: number): Promise<boolean | errorType>
}
