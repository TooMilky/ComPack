import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

// Forum Component
import { ForumListComponent } from './forum-list/forum-list.component';
import { AddForumComponent } from './add-forum/add-forum.component';
import { EditForumComponent } from './edit-forum/edit-forum.component';
import { ForumDetailComponent } from './forum-detail/forum-detail.component';

// Staff Component
import { StaffComponent } from './staff/staff.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'forums',
    pathMatch: 'full'
  },
  {
    path: 'forums',
    component: ForumListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'forum-detail',
    component: ForumDetailComponent,
  },
  {
    path: 'forum-detail/:_id',
    component: ForumDetailComponent
  },
  {
    path: 'staff',
    component: StaffComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'staff-list',
    component: StaffListComponent,
  },
  {
    path: 'new-staff',
    component: AddStaffComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new',
    component: AddForumComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-forum',
    component: EditForumComponent
  },
  {
    path: 'edit-forum/:_id',
    component: EditForumComponent
  },
  {
    path: 'edit-staff',
    component: EditStaffComponent
  },
  {
    path: 'edit-staff/:_id',
    component: EditStaffComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'forums'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


