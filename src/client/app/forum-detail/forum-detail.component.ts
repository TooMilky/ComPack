import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Forum } from '../shared/forum.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { ForumService } from '../shared/forum.service';


@Component({
  selector: 'app-forum-detail.',
  templateUrl: './forum-detail.component.html',
  styleUrls: ['./forum-detail.component.scss']
})
export class ForumDetailComponent implements OnInit {

  loading: Boolean = false;
  editForum: Forum;
  forum: Forum[];  
  _id: string;
  private sub: any;

  constructor(private forumService : ForumService, public api: ApiService, private router: Router, private route: ActivatedRoute) { }

 
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this._id = params['_id'];
    });
    
    this.api.get('forums/' + this._id)
    .subscribe(data => this.forum = data);    
  }

  updateForum(id) {
    
    this.forumService.updateForum(id, this.forum).then((result) => { 
    }, (err) => {
      console.log(err);
    });

    this.api.get('forums/' + this._id)
    .subscribe(data => this.editForum = data);  

  }


}
