import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private api: ApiService,
              private auth: AuthService,
              private router: Router) { }

  // If the user is logged, then stay login            
  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/forums']);
    }
  }

  onSubmit(form: NgForm) {
    const values = form.value;

    const payload = {
      username: values.username,
      password: values.password
    };

    this.api.post('authenticate', payload)
      .subscribe(data => {    console.log(data._id + "fuk");

        this.auth.setToken(data.token, data.admin, payload.username, data._id);
        this.router.navigate(['/forums']);
      });
  }

}
