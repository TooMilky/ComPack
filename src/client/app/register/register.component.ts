import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../shared/user.model';
import { bcrypt } from 'bcrypt';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  loading: Boolean = false;
  newUser: User;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.loading = true;

    const formValues = Object.assign({}, form.value);

    const user: User = {
      username: `${formValues.username}`,
      admin: false,
      password: formValues.password
    };

    // Posting payload to authenticate route
    this.api.post('register', user)
      .subscribe(data => {
        form.reset();
        this.loading = false;
        this.newUser = data;
        this.router.navigate(['/login']);        
      });
  }

}