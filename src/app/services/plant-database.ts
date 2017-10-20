import {Injectable} from '@angular/core'
import {PLANTS} from '../dataset/plants'
import {BehaviorSubject} from 'rxjs/BehaviorSubject'

export let LATEST_ID = 0

export interface PlantData {
  location: string
  region: string
  yieldData: any
}

@Injectable()
export class PlantDatabase {
  dataChange: BehaviorSubject<PlantData[]> = new BehaviorSubject<PlantData[]>([])

  get data(): PlantData[] { return this.dataChange.value }

  constructor() {
    this.initialize()
  }

  initialize() {
    LATEST_ID = 0
    this.dataChange.next([])
    for (let i = 0; i < PLANTS.length ; i++) { this.addPlant(i) }
  }

  addPlant(i) {
    const thisPlant = PLANTS[i]

    const copiedData = this.data.slice()
    copiedData.push({
      location: thisPlant.location,
      region: thisPlant.region,
      yieldData: thisPlant.yieldData
    })

    this.dataChange.next(copiedData)
  }
}
