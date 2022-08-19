import { newLocationType } from './model'

interface ILocationDomain {
  asJSON(): newLocationType
}

export class Location implements ILocationDomain {
  private newLocation: newLocationType

  constructor (newLocation: newLocationType) {
    this.newLocation = newLocation
  }

  asJSON () {
    return this.newLocation
  }
}
