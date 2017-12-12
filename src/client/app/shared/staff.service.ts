import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import 'rxjs/add/operator/map';

@Injectable()
export class StaffService {

  constructor(public api: ApiService) { }

  updateStaff(id, data) {
    return new Promise((resolve, reject) => {
        this.api.put('/staffs/'+id, data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  deleteStaff(id) {
    return new Promise((resolve, reject) => {
        this.api.delete('/staffs/'+id)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }
}
