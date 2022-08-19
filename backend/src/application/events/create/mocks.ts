import { CreateEventApplication } from '.'
import { EventType, newEventEntryType } from '../../../domain/event/model/create'
import { IcreateEventInfra } from '../../../domain/event/protocols'
import { IcheckLocationExists, ICheckLocationExistsParams } from '../../../domain/location/protocols'
import { IcheckUserExists } from '../../../domain/user/protocols'
import { Error409 } from '../../errorHandling/useCases/error409'
import { Error500 } from '../../errorHandling/useCases/error500'

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

  async check (id: number): Promise<boolean> {
    return Promise.resolve(this.response)
  }
}

class CheckLocationExistsMock implements IcheckLocationExists {
  response: boolean

  constructor (response: boolean) {
    this.response = response
  }

  async check (data: ICheckLocationExistsParams): Promise<boolean> {
    return Promise.resolve(this.response)
  }
}

export const makeSut = (userExists: boolean, locationExists: boolean, event: EventType) => {
  const checkUserExistsMocked = new CheckUserExistsMock(userExists)
  const CheckLocationExistsMocked = new CheckLocationExistsMock(locationExists)
  const error500 = new Error500()
  const error409 = new Error409()
  const createEvent = new CreateEvent(event)

  const sut = new CreateEventApplication(checkUserExistsMocked, error409, error500, createEvent, CheckLocationExistsMocked)

  return {
    sut, checkUserExistsMocked, error409, error500, createEvent
  }
}

export const eventMocked = (): EventType => {
  return {
    id: 123,
    location: {
      latitude: 123,
      longitude: 321,
      name: 'any_name',
      id: 123,
      photos: []
    },
    name: 'any_name',
    price: 123
  }
}
