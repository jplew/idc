import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { AppError } from '../common/app-error'
import { NotFoundError } from '../common/not-found-error'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'
import { Subject } from 'rxjs/Subject'

@Injectable()
export class DataService {

  plantData: any
  currentPlantId: any
  currentPlant: any
  url: string

  // Observable string sources
  private plantChangedSource = new Subject<number>()

  // Observable string streams
  plantChanged$ = this.plantChangedSource.asObservable()

  constructor(private http: Http) {
    this.url = '../../assets/json/plant-info.json'
  }

  changePlant(id: number) {
    this.plantChangedSource.next(id)
  }

  getAll() {
    return this.http.get(this.url)
  }

  getPlants() {

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
        // this 'markers' object will be sent to Google Maps to generate markers

        this.plantData = response
        console.log(this.plantData)
      },
      error => {
        console.log(error)
      })
  }
  // createPost(post) {
  //   // post.id = 12
  //   return this.http.post(this.url, post)
  // }

  // deletePost(id) {
  //   return this.http.delete(this.url + '/' + id)
  //     .catch((error: Response) => {
  //       if (error.status === 404) {
  //         console.log('This was a 404')

  //         return Observable.throw(new NotFoundError())
  //       }

  //       return Observable.throw(new AppError(error))
  //     })
  // }

  // updatePost(post) {
  //   return this.http.patch(this.url + '/' + post.id, JSON.stringify({ isRead: true }))
  // }

}
