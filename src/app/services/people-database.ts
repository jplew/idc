import {Injectable} from '@angular/core'
import {NAMES} from '../dataset/names'
import {COLORS} from '../dataset/colors'
import {PLANTS} from '../dataset/plants'
import {BehaviorSubject} from 'rxjs/BehaviorSubject'

export let LATEST_ID = 0

export interface PlantData {
  location: string
  region: string
  yieldData: any
}

@Injectable()
export class PeopleDatabase {
  dataChange: BehaviorSubject<PlantData[]> = new BehaviorSubject<PlantData[]>([])

  get data(): PlantData[] { return this.dataChange.value }

  constructor() {
    this.initialize()
  }

  initialize() {
    LATEST_ID = 0
    this.dataChange.next([])
    console.log(PLANTS)
    for (let i = 0; i < PLANTS.length ; i++) { this.addPlant(i) }
  }

  shuffle(changeReferences: boolean) {
    let copiedData = this.data.slice()
    for (let i = copiedData.length; i; i--) {
      const j = Math.floor(Math.random() * i);
      [copiedData[i - 1], copiedData[j]] = [copiedData[j], copiedData[i - 1]]
    }

    if (changeReferences) {
      copiedData = copiedData.map(plantData => {
        return {
          location: plantData.location,
          region: plantData.region,
          yieldData: plantData.yieldData
        }
      })
    }

    this.dataChange.next(copiedData)
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
