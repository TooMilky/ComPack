import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Staff } from '../shared/staff.model';
import { StaffService } from '../shared/staff.service';
import { AuthService } from '../shared/auth.service';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  @Input() staff: Staff;
  byUser: string;
  _id: string;

  @HostBinding('class') columnClass = 'four wide column';

  constructor(private staffService: StaffService, private auth: AuthService, private api: ApiService) { }

  ngOnInit() {
    this.byUser = this.auth.getUsername();
  }

  deleteStaff(id) {
    this.staffService.deleteStaff(id).then((result) => {
    }, (err) => {
      console.log(err);
    });
  }

}