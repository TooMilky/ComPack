import { Component, OnInit } from '@angular/core';
import { Staff } from '../shared/staff.model';
import { ApiService } from '../shared/api.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit {

  staffs: Staff[];

  constructor(public api: ApiService, private auth : AuthService) { }

  ngOnInit() {
    this.api.get('staffs')
      .subscribe(data => this.staffs = data);
  }

}
