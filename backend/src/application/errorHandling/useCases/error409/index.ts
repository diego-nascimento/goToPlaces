import { errorType, IError } from '../../protocols'

export class Error409 implements IError {
  createError (message: string): errorType {
    return {
      code: 409,
      message
    }
  }
}
