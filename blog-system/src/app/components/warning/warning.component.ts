import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})
export class WarningComponent implements OnInit{

  savedPosts: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    // Get the list of saved posts from the PostService
    this.savedPosts = this.adminService.getSavedPosts();
  }

  removeSavedPost(post: any) {
    // Remove the post from the list of saved posts in the PostService
    this.adminService.removeSavedPost(post);
    // Update the list of saved posts in the component
    this.savedPosts = this.adminService.getSavedPosts();
  }

}
