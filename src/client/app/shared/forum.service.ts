import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import 'rxjs/add/operator/map';

@Injectable()
export class ForumService {

  constructor(public api: ApiService) { }

  updateForum(id, data) {
    return new Promise((resolve, reject) => {
        this.api.put('/forums/'+id, data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  deleteForum(id) {
    return new Promise((resolve, reject) => {
        this.api.delete('/forums/'+id)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }
}
