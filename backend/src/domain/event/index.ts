import { newEventEntryType } from './model/create'

interface IEventDomain {
  asJSON(): newEventEntryType
}

export class Event implements IEventDomain {
  private newEvent: newEventEntryType

  constructor (newEvent: newEventEntryType) {
    this.newEvent = newEvent
  }

  asJSON () {
    return this.newEvent
  }
}
