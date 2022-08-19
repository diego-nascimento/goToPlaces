import { errorType } from '../../../application/errorHandling/protocols'
import { locationType, newLocationType } from '../model'

export interface IcreateLocation {
  create(data: newLocationType):Promise<locationType | errorType>
}

export interface IcreateLocationInfra {
  create(data: newLocationType):Promise<locationType | errorType>
}

export interface ICheckLocationExistsParams {
  id?: number,
  location?: newLocationType
}

export interface IcheckLocationExists {
  check(data: ICheckLocationExistsParams):Promise<boolean | errorType>
}

export interface IcheckLocationExistsInfra {
  check(data: ICheckLocationExistsParams):Promise<boolean | errorType>
}
