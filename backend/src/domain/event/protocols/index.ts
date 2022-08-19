import { errorType } from '../../../application/errorHandling/protocols'
import { newEventEntryType, EventType } from '../model/event/create'

export interface IcreateEvent {
  create(data: newEventEntryType): Promise<EventType | errorType>
}

export interface IcreateEventInfra {
  create(data: newEventEntryType): Promise<EventType>
}
