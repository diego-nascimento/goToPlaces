import { makeSut } from './mocks'

describe('CheckUserExists', () => {
  test('Deve chamar checkUserExistsInfra com parametros corretos', async () => {
    const { sut, checkUserExistsInfra } = makeSut({
      userExists: false
    })
    const checkUserExistsInfraFuncMocked = jest.fn(() => Promise.resolve(true))
    jest.spyOn(checkUserExistsInfra, 'check').mockImplementationOnce(checkUserExistsInfraFuncMocked)
    await sut.check(123)
    expect(checkUserExistsInfraFuncMocked).toHaveBeenCalledTimes(1)
    expect(checkUserExistsInfraFuncMocked).toHaveBeenCalledWith(123)
  })

  test('Deve retornar error 500 com mensagem correta se checkUserExistsInfra throws', async () => {
    const { sut, checkUserExistsInfra, error500 } = makeSut({
      userExists: false
    })

    jest.spyOn(checkUserExistsInfra, 'check').mockImplementationOnce(() => Promise.reject(new Error('Custom error')))
    const response = await sut.check(123)
    expect(response).toStrictEqual(error500.createError('Custom error'))
  })

  test('Deve retornar error 500 com mensagem default se checkUserExistsInfra throws sem mensagem', async () => {
    const { sut, checkUserExistsInfra, error500 } = makeSut({
      userExists: false
    })

    jest.spyOn(checkUserExistsInfra, 'check').mockImplementationOnce(() => Promise.reject(new Error()))
    const response = await sut.check(123)
    expect(response).toStrictEqual(error500.createError('Something went wrong'))
  })

  test('Deve retornar um boolean com a response se tudo correr bem', async () => {
    const { sut } = makeSut({
      userExists: false
    })
    const response = await sut.check(123)
    expect(response).toBe(false)
  })
})
