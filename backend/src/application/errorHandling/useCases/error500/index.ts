import { errorType, IError } from '../../protocols'

export class Error500 implements IError {
  createError (message: string): errorType {
    return {
      code: 500,
      message
    }
  }
}
