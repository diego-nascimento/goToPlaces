import { CreateEventApplication } from '.'
import { EventType, newEventEntryType } from '../../../../domain/event/model/event/create'
import { IcreateEventInfra } from '../../../../domain/event/protocols'
import { IcheckUserExists } from '../../../../domain/user'
import { Error404 } from '../../../errorHandling/useCases/error404'
import { Error500 } from '../../../errorHandling/useCases/error500'

class CreateEvent implements IcreateEventInfra {
  event: EventType

  constructor (event: EventType) {
    this.event = event
  }

  async create (data: newEventEntryType): Promise<EventType> {
    return Promise.resolve(this.event)
  }
}

class CheckUserExistsMock implements IcheckUserExists {
  response: boolean

  constructor (response: boolean) {
    this.response = response
  }

  async check (id: string): Promise<boolean> {
    return Promise.resolve(this.response)
  }
}

export const makeSut = (userExists: boolean, event: EventType) => {
  const checkUserExistsMocked = new CheckUserExistsMock(userExists)
  const error500 = new Error500()
  const error404 = new Error404()
  const createEvent = new CreateEvent(event)

  const sut = new CreateEventApplication(checkUserExistsMocked, error404, error500, createEvent)

  return {
    sut, checkUserExistsMocked, error404, error500, createEvent
  }
}

export const eventMocked = (): EventType => {
  return {
    id: 'any_id',
    created_At: new Date(),
    location: {
      latitude: 123,
      longitude: 321,
      name: 'any_name'
    },
    name: 'any_name',
    price: 123,
    responsable: '123',
    updated_At: new Date()
  }
}
