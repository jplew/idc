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
      .map( res => res.json() )
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error) // for demo purposes only
    return Promise.reject(error.message || error)
  }
}
