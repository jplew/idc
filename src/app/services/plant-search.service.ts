import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

import { PlantData } from './in-mem-plant.service'

@Injectable()
export class PlantSearchService {

  private existingRegion: any

  constructor(private http: Http) {}

  search(term: string): Observable<PlantData[]> {
    return this.http.get(`api/plants/?location=${term}`)
      .map( res => {

        const data = res.json()
        const results = []

        for (let i = 0; i < data.length; i++) {

          const element = data[i]

          this.existingRegion = results.find( result => {
            return result.region === element.region
          })

          // create a new region (continent) object only if one doesn't already exist
          if (!this.existingRegion) {
            const regionObj: any = {}
            regionObj.region = element.region
            regionObj.locations = []

            results.push(regionObj)

            this.existingRegion = regionObj
          }

          const locationObj: any = {}
          locationObj.id = element.id
          locationObj.lat = element.lat
          locationObj.lng = element.lng
          locationObj.name = element.location
          locationObj.fpy = element.yieldData[4].value

          this.existingRegion.locations.push(locationObj)

        }

        return results

      })
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error) // for demo purposes only
    return Promise.reject(error.message || error)
  }
}
