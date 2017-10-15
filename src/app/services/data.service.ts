import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { AppError } from '../common/app-error'
import { NotFoundError } from '../common/not-found-error'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'

@Injectable()
export class DataService {

  url: string

  constructor(private http: Http) {
    this.url = '../../assets/json/plant-info.json'
  }

  getAll() {
    return this.http.get(this.url)
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
