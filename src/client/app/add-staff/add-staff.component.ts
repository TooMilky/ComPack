import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Staff } from '../shared/staff.model';
import { ApiService } from '../shared/api.service';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent implements OnInit {

  loading: Boolean = false;
  newStaff: Staff;
  _id: string;
  admin: string;


  constructor(public api: ApiService, private auth: AuthService) { }

  ngOnInit() {    
    this._id = localStorage.getItem('_id');

  }

  onSubmit(form: NgForm) {
    this.loading = true;
    const formValues = Object.assign({}, form.value);

    const staff: Staff = {
      title: formValues.title,
      price: formValues.price,
      description: formValues.description,
      photoUrl: formValues.photo
    };

    this.api.post('staffs', staff)
      .subscribe(data => {
        form.reset();
        this.loading = false;
        this.newStaff = data;
      });
  }

}