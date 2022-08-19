import { makeSut } from './mocks'

describe('createLocationApplication tests', () => {
  test('Deve retonar error 409, se location ja existir', async () => {
    const { sut, newLocationMocked, error409 } = makeSut({ locationExists: true })
    const response = await sut.create(newLocationMocked)
    expect(response).toStrictEqual(error409.createError('Location already exists'))
  })

  test('Deve retonar error 500 com mensagem correta, se checklocationexists throws', async () => {
    const { sut, newLocationMocked, error500, checkLocationExists } = makeSut({ locationExists: true })
    jest.spyOn(checkLocationExists, 'check').mockImplementationOnce(() => {
      return Promise.reject(new Error('Custom error'))
    })
    const response = await sut.create(newLocationMocked)
    expect(response).toStrictEqual(error500.createError('Custom error'))
  })

  test('Deve retonar error 500 com mensagem correta, se createLocation throws', async () => {
    const { sut, newLocationMocked, error500, createLocationInfra } = makeSut({ locationExists: false })
    jest.spyOn(createLocationInfra, 'create').mockImplementationOnce(() => {
      return Promise.reject(new Error('Custom error'))
    })
    const response = await sut.create(newLocationMocked)
    expect(response).toStrictEqual(error500.createError('Custom error'))
  })

  test('Deve retonar error 500 com mensagem default, se algo throws sem mensagem', async () => {
    const { sut, newLocationMocked, error500, createLocationInfra } = makeSut({ locationExists: false })
    jest.spyOn(createLocationInfra, 'create').mockImplementationOnce(() => {
      return Promise.reject(new Error())
    })
    const response = await sut.create(newLocationMocked)
    expect(response).toStrictEqual(error500.createError('Something went wrong'))
  })

  test('Deve retonar um location, se location tudo correr bem', async () => {
    const { sut, newLocationMocked, makeLocation } = makeSut({ locationExists: false })
    const response = await sut.create(newLocationMocked)
    expect(response).toStrictEqual(makeLocation())
  })
})
