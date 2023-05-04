import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { DetailsPostComponent } from './components/details-post/details-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';

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
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
