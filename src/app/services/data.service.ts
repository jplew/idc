import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { AppError } from '../common/app-error'
import { NotFoundError } from '../common/not-found-error'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'
import { Subject } from 'rxjs/Subject'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { PlantData } from './in-mem-plant.service'

@Injectable()
export class DataService {

  private plantsUrl = 'api/plants'
  private plantUrl = 'api/plants/${id}'
  plantData: any
  currentPlantLocation: string
  currentPlantId: number
  currentPlant: any
  url: string
  nativeMarkers: any[]

  // Observable string sources
  private plantChangedSource = new Subject<number>()
  private _loadDataSource = new BehaviorSubject<any[]>([])

  // Observable string streams
  plantChanged$ = this.plantChangedSource.asObservable()
  loadData$ = this._loadDataSource.asObservable()

  constructor(private http: Http) {
    this.nativeMarkers = []
  }

  changePlant(id: number) {
    this.plantChangedSource.next(id)
  }

  getPlants(): Promise<PlantData[]> {
    return this.http.get(this.plantsUrl)
      .toPromise()
      .then( res => res.json() )
      .catch(this.handleError)
  }

  getPlant(id: number) {
    return this.http.get(`${this.plantsUrl}/${id}`)
      .toPromise()
      .then( res => res.json() )
      .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error) // for demo purposes only
    return Promise.reject(error.message || error)
  }

}
