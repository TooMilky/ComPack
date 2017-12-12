import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Forum } from '../shared/forum.model';
import { ApiService } from '../shared/api.service';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-add-forum',
  templateUrl: './add-forum.component.html',
  styleUrls: ['./add-forum.component.scss']
})
export class AddForumComponent implements OnInit {

  loading: Boolean = false;
  newForum: Forum;
  byUser: string;
  user: User;
  users: User[] = [];
  _id: string;
  admin: string;


  constructor(public api: ApiService, private auth: AuthService) { }

  ngOnInit() {    
    this._id = localStorage.getItem('_id');
    this.api.get('users/' + this._id)
      .subscribe(data => this.user = data);
    this.byUser = this.auth.getUsername();
  }

  onSubmit(form: NgForm) {
    this.loading = true;
    const formValues = Object.assign({}, form.value);

    const forum: Forum = {
      byUser: this.byUser,
      title: formValues.title,
      price: formValues.price,
      description: formValues.description,
      photoUrl: formValues.photo
    };

    this.api.post('forums', forum)
      .subscribe(data => {
        form.reset();
        this.loading = false;
        this.newForum = data;
      });
  }

}