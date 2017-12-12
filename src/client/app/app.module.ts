import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MenuComponent } from './menu/menu.component';
import { ForumListComponent } from './forum-list/forum-list.component';
import { ForumComponent } from './forum/forum.component';
import { AddForumComponent } from './add-forum/add-forum.component';
import { LoginComponent } from './login/login.component';
import { ForumDetailComponent } from './forum-detail/forum-detail.component';
import { RegisterComponent } from './register/register.component';
import { EditForumComponent } from './edit-forum/edit-forum.component';
import { ForumService} from './shared/forum.service';
import { StaffComponent } from './staff/staff.component';
import { StaffService} from './shared/staff.service';
import { StaffListComponent } from './staff-list/staff-list.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';

//Implement Api Service
import { ApiService } from './shared/api.service';
//Implement Auth Service
import { AuthService } from './shared/auth.service';
//Implement Auth Guard
import { AuthGuard } from './auth.guard';





@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ForumListComponent,
    ForumComponent,
    AddForumComponent,
    LoginComponent,
    RegisterComponent,
    EditForumComponent,
    ForumDetailComponent,
    StaffComponent,
    StaffListComponent,
    AddStaffComponent,
    EditStaffComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ApiService, AuthService, AuthGuard, ForumService, StaffService],
  bootstrap: [AppComponent]
})
export class AppModule { }
