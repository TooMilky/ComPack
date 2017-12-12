import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Forum } from '../shared/forum.model';
import { ForumService } from '../shared/forum.service';
import { AuthService } from '../shared/auth.service';
import { ApiService } from '../shared/api.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  @Input() forum: Forum;
  byUser: string;
  _id: string;
  

  @HostBinding('class') columnClass = 'four wide column';

  constructor(private forumService : ForumService, private auth : AuthService, private api: ApiService) { }

  ngOnInit() {
    this.byUser = this.auth.getUsername();
  }

  deleteForum(id) {
    this.forumService.deleteForum(id).then((result) => {
    }, (err) => {
      console.log(err);
    });
  }


}
