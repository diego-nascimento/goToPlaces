import { newEventEntryType } from '../../../../domain/event/model/event/create'

import { makeSut, eventMocked } from './mocks'

describe('createEventApplication tests', () => {
  test('Deve retornar error 404 se responsavel nao existir', async () => {
    const event = eventMocked()
    const { sut, error404 } = makeSut(false, event)
    const eventEntry: newEventEntryType = {
      location: {
        latitude: 123,
        longitude: 123,
        name: 'any'
      },
      name: 'any_name',
      price: 123,
      responsable: '123'
    }
    const response = await sut.create(eventEntry)
    expect(response).toStrictEqual(error404.createError('User not found'))
  })

  test('Deve chamar checkUserExists com parametro correto', async () => {
    const event = eventMocked()
    const { sut, checkUserExistsMocked } = makeSut(false, event)

    const checkUserExistsCheckMocked = jest.fn()

    jest.spyOn(checkUserExistsMocked, 'check').mockImplementationOnce(checkUserExistsCheckMocked)
    const eventEntry: newEventEntryType = {
      location: {
        latitude: 123,
        longitude: 123,
        name: 'any'
      },
      name: 'any_name',
      price: 123,
      responsable: '123'
    }
    await sut.create(eventEntry)
    expect(checkUserExistsCheckMocked).toHaveBeenCalledTimes(1)
    expect(checkUserExistsCheckMocked).toHaveBeenCalledWith(eventEntry.responsable)
  })

  test('Deve retornar error 500 com mensagem correta createEvent throw', async () => {
    const event = eventMocked()
    const { sut, createEvent, error500 } = makeSut(true, event)

    jest.spyOn(createEvent, 'create').mockImplementationOnce(() => { throw new Error('message') })
    const eventEntry: newEventEntryType = {
      location: {
        latitude: 123,
        longitude: 123,
        name: 'any'
      },
      name: 'any_name',
      price: 123,
      responsable: '123'
    }
    const response = await sut.create(eventEntry)
    expect(response).toStrictEqual(error500.createError('message'))
  })

  test('Deve retornar evento criado se der tudo certo', async () => {
    const event = eventMocked()
    const { sut } = makeSut(true, event)

    const eventEntry: newEventEntryType = {
      location: {
        latitude: 123,
        longitude: 123,
        name: 'any'
      },
      name: 'any_name',
      price: 123,
      responsable: '123'
    }
    const response = await sut.create(eventEntry)
    expect(response).toStrictEqual(eventMocked())
  })
})
