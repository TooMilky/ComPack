import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Staff } from '../shared/staff.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { StaffService } from '../shared/staff.service';


@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.scss']
})
export class EditStaffComponent implements OnInit {

  loading: Boolean = false;
  editStaff: Staff;
  staff: Staff[];  
  _id: string;
  private sub: any;

  constructor(private staffService : StaffService, public api: ApiService, private router: Router, private route: ActivatedRoute) { }

 
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this._id = params['_id'];
    });
    
    this.api.get('staffs/' + this._id)
    .subscribe(data => this.staff = data);    
  }

  updateStaff(id) {
    
    this.staffService.updateStaff(id, this.staff).then((result) => { 
    }, (err) => {
      console.log(err);
    });

    this.api.get('staffs/' + this._id)
    .subscribe(data => this.editStaff = data);  

  }

}
