import { errorType, IError } from '../../protocols'

export class Error404 implements IError {
  createError (message: string): errorType {
    return {
      code: 400,
      message
    }
  }
}
