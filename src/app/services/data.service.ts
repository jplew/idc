import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { AppError } from '../common/app-error'
import { NotFoundError } from '../common/not-found-error'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'
import { Subject } from 'rxjs/Subject'
import {BehaviorSubject} from 'rxjs/BehaviorSubject'

@Injectable()
export class DataService {

  plantData: any
  currentPlantLocation: string
  currentPlant: any
  url: string
  nativeMarkers: any[]

  // Observable string sources
  private plantChangedSource = new Subject<string>()
  private _loadDataSource = new BehaviorSubject<any[]>([])

  // Observable string streams
  plantChanged$ = this.plantChangedSource.asObservable()
  loadData$ = this._loadDataSource.asObservable()

  constructor(private http: Http) {
    this.url = '../../assets/json/plant-info.json'
    this.emitData()
    this.nativeMarkers = []
  }

  changePlant(location: string) {
    this.plantChangedSource.next(location)
  }

  emitData() {
    this.getAll()
      .map(res => {
        const obj = res.json()
        obj.forEach(element => {
          const fpyRow = element.yieldData.find(({ cat }) => {
            return cat === 'FPY'
          })
          element.isGoodYield = (fpyRow.value > 70) ? true : false
        })
        return obj
      })
      .subscribe(
      response => {
        this._loadDataSource.next(response)
      },
      error => {
        console.log(error)
      })
  }


  getAll() {
    return this.http.get(this.url)
  }

}
