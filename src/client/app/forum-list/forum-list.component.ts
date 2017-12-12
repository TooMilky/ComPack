import { Component, OnInit } from '@angular/core';
import { Forum } from '../shared/forum.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-forum-list',
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.scss']
})
export class ForumListComponent implements OnInit {

  forums: Forum[];

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.api.get('forums')
      .subscribe(data => this.forums = data);
  }

}
