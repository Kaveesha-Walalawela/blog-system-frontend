import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { DetailsPostComponent } from './components/details-post/details-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { LoginComponent } from './components/login/login.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
// import { UsersComponent } from './components/users/users.component';
import { SavedPostsComponent } from './components/saved-posts/saved-posts.component';
import { UserComponent } from './components/user/user.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { PendingComponent } from './components/pending/pending.component';
import { UsersComponent } from './components/users/users.component';
import { FlagComponent } from './components/flag/flag.component';
import { AdminEditUsersComponent } from './components/admin-edit-users/admin-edit-users.component';
import { AdminAddPostComponent } from './components/admin-add-post/admin-add-post.component';
import { AdminWarningsComponent } from './components/admin-warnings/admin-warnings.component';
// import { SignupComponent } from './components/signup/signup.component';
const routes: Routes = [
  {
    path:'home', component:HomeComponent
    },
    {
      path:'about', component:AboutComponent
    },
    {
      path:'addpost', component:AddPostComponent
    },
    {
      path:'posts/:id', component:DetailsPostComponent
    },
    {
      path:'editpost/:id', component:EditPostComponent
    },
    {
      path:'login', component:LoginComponent
    },
    {
      redirectTo:'', path:'login', pathMatch:"full"
    },
    {
      path:'admin-home', component:AdminHomeComponent
    },
    {
      path:'user', component:UserComponent
    },
    {
      path:'saved-posts', component:SavedPostsComponent
    },
    { path: 'edit-profile', component: EditProfileComponent 
    },
    {
      path: 'admin', component:AdminComponent
    },
    {
      path: 'pending', component:PendingComponent
    },
    {
      path: 'users', component:UsersComponent
    },
    {
      path: 'flag', component:FlagComponent
    },
    { path: 'admin-edit-users/:id', component: AdminEditUsersComponent 
    },
    {
      path: 'admin-add-post', component:AdminAddPostComponent
    },
    {
      path: 'admin-warnings', component:AdminWarningsComponent
    }
 
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
