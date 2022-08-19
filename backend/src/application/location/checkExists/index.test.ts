
import { ICheckLocationExistsParams } from '../../../domain/location/protocols'
import { makeSut } from './mocks'

describe('CheckLocationExists', () => {
  test('Deve chamar checkLocationExists com parametros corretos', async () => {
    const { sut, checkLocationExistsMocked } = makeSut({ locationExists: false })
    const checkFunctionMocked = jest.fn(() => Promise.resolve(true))
    jest.spyOn(checkLocationExistsMocked, 'check').mockImplementationOnce(checkFunctionMocked)
    const params: ICheckLocationExistsParams = {
      id: 123
    }
    await sut.check(params)
    expect(checkFunctionMocked).toHaveBeenCalledTimes(1)
    expect(checkFunctionMocked).toHaveBeenCalledWith(params)
  })
  test('Deve retornar error 500 com a mensagem correta se checkLocationExists throws', async () => {
    const { sut, checkLocationExistsMocked, error500 } = makeSut({ locationExists: false })
    jest.spyOn(checkLocationExistsMocked, 'check').mockImplementationOnce(() => {
      return Promise.reject(new Error('Custom message'))
    })
    const params: ICheckLocationExistsParams = {
      id: 123
    }
    const response = await sut.check(params)
    expect(response).toStrictEqual(error500.createError('Custom message'))
  })

  test('Deve retornar error 500 com a mensagem default se checkLocationExists throws sem mensagem', async () => {
    const { sut, checkLocationExistsMocked, error500 } = makeSut({ locationExists: false })
    jest.spyOn(checkLocationExistsMocked, 'check').mockImplementationOnce(() => {
      return Promise.reject(new Error())
    })
    const params: ICheckLocationExistsParams = {
      id: 123
    }
    const response = await sut.check(params)
    expect(response).toStrictEqual(error500.createError('Something went wrong'))
  })

  test('Deve retornar um boolean se tudo der certo', async () => {
    const { sut } = makeSut({ locationExists: true })
    const params: ICheckLocationExistsParams = {
      id: 123
    }
    const response = await sut.check(params)
    expect(response).toBe(true)
  })
})
