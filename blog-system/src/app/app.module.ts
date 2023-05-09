import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './header/header.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { DetailsComponent } from './components/details/details.component';
import { DetailsPostComponent } from './components/details-post/details-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
// import { SignupComponent } from './components/signup/signup.component';
import { PostsComponent } from './components/posts/posts.component';
import { RouterModule } from '@angular/router';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { UsersComponent } from './components/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    AddPostComponent,
    HomeComponent,
    HeaderComponent,
    EditPostComponent,
    DetailsComponent,
    DetailsPostComponent,
    LoginComponent,
    // SignupComponent,
    PostsComponent,
    AdminHomeComponent,
    AdminHeaderComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
