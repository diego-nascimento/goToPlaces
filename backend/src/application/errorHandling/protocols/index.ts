
export type errorType = {
  code: number
  message: string
}

export interface IError {
  createError(message: string): errorType
}
