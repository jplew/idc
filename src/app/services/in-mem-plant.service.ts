import { Injectable } from '@angular/core'
import { InMemoryDbService } from 'angular-in-memory-web-api'
import { PLANTS } from '../dataset/plants'

export interface PlantData {
  id: number
  lat: number
  lng: number
  location: string
  region: string
  yieldData: any
  equipment: any
  isGoodYield?: boolean
}

@Injectable()
export class InMemPlantService implements InMemoryDbService {
  createDb() {
    const plants: PlantData[] = PLANTS
    return {plants}
  }
}
