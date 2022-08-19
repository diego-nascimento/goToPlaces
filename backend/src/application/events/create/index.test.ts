import { newEventEntryType } from '../../../domain/event/model/create'

import { makeSut, eventMocked } from './mocks'

describe('createEventApplication tests', () => {
  test('Deve retornar error 409 se responsavel nao existir', async () => {
    const event = eventMocked()
    const { sut, error409 } = makeSut(false, true, event)
    const eventEntry: newEventEntryType = {
      location: 123,
      name: 'any_name',
      price: 123,
      responsable: 123
    }
    const response = await sut.create(eventEntry)
    expect(response).toStrictEqual(error409.createError('User not found'))
  })

  test('Deve retornar error 409 se location nao existir', async () => {
    const event = eventMocked()
    const { sut, error409 } = makeSut(true, false, event)
    const eventEntry: newEventEntryType = {
      location: 123,
      name: 'any_name',
      price: 123,
      responsable: 123
    }
    const response = await sut.create(eventEntry)
    expect(response).toStrictEqual(error409.createError('Location does not exists'))
  })

  test('Deve chamar checkUserExists com parametro correto', async () => {
    const event = eventMocked()
    const { sut, checkUserExistsMocked } = makeSut(false, true, event)

    const checkUserExistsCheckMocked = jest.fn()

    jest.spyOn(checkUserExistsMocked, 'check').mockImplementationOnce(checkUserExistsCheckMocked)
    const eventEntry: newEventEntryType = {
      location: 123,
      name: 'any_name',
      price: 123,
      responsable: 123
    }
    await sut.create(eventEntry)
    expect(checkUserExistsCheckMocked).toHaveBeenCalledTimes(1)
    expect(checkUserExistsCheckMocked).toHaveBeenCalledWith(eventEntry.responsable)
  })

  test('Deve retornar error 500 com mensagem correta createEvent throw', async () => {
    const event = eventMocked()
    const { sut, createEvent, error500 } = makeSut(true, true, event)

    jest.spyOn(createEvent, 'create').mockImplementationOnce(() => { throw new Error('message') })
    const eventEntry: newEventEntryType = {
      location: 123,
      name: 'any_name',
      price: 123,
      responsable: 123
    }
    const response = await sut.create(eventEntry)
    expect(response).toStrictEqual(error500.createError('message'))
  })

  test('Deve retornar error 500 com mensagem default se algo throw sem mensagem', async () => {
    const event = eventMocked()
    const { sut, createEvent, error500 } = makeSut(true, true, event)

    jest.spyOn(createEvent, 'create').mockImplementationOnce(() => { throw new Error() })
    const eventEntry: newEventEntryType = {
      location: 123,
      name: 'any_name',
      price: 123,
      responsable: 123
    }
    const response = await sut.create(eventEntry)
    expect(response).toStrictEqual(error500.createError('Something went wrong'))
  })

  test('Deve retornar evento criado se der tudo certo', async () => {
    const event = eventMocked()
    const { sut } = makeSut(true, true, event)

    const eventEntry: newEventEntryType = {
      location: 123,
      name: 'any_name',
      price: 123,
      responsable: 123
    }
    const response = await sut.create(eventEntry)
    expect(response).toStrictEqual(eventMocked())
  })
})
