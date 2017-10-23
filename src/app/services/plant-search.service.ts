import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

import { PlantData } from './in-mem-plant.service'

@Injectable()
export class PlantSearchService {

  constructor(private http: Http) {}

  search(term: string): Observable<PlantData[]> {
    return this.http.get(`api/plants/?location=${term}`)
      .map( res => {
        // console.log(res.json())
        const data = res.json()
        const results = []

        for (let i = 0; i < data.length; i++) {

          const element = data[i]

          let existingRegion = results.find( x => {
            return x.name === element.region
          })
          console.log(existingRegion)

          // if the region has not been added yet, then add it.
          if (i === 0) {
            const regionObj: any = {}
            regionObj.name = element.region
            results.push(regionObj)
            existingRegion = regionObj
            existingRegion.locations = []
          } else {
            if (existingRegion) {
              console.log('Region exists already')
              return
            } else {
              console.log('Region does not exist yet')
              const regionObj: any = {}
              regionObj.name = element.region
              results.push(regionObj)
              existingRegion = regionObj
              existingRegion.locations = []
            }
          }

          const locationObj = {}
          locationObj['name'] = element.location
          locationObj['fpy'] = element.yieldData[4].value
          existingRegion.locations.push(locationObj)

        }

        console.log(results)

        return results

        // data.forEach(element => {

        //   results.forEach( ( e, i ) => {

        //     console.log(i)


        //     if ( e.name && e.name === element.region ) {
        //       console.log('already exists')
        //       return
        //     } else {
        //       console.log('region doesn\'t exist yet')
        //       const myRegionObj: any = {}
        //       myRegionObj.name = element.region
        //       results.push(regionObj)
        //     }
        //   })
        //   console.log(results)

        //   const currentObj = results.find( obj => {
        //     return obj.name === element.region
        //   })
        //   console.log(currentObj)

        // })
      })
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error) // for demo purposes only
    return Promise.reject(error.message || error)
  }
}
