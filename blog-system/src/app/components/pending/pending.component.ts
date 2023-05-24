import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {
  pendingPosts: any[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.loadPendingPosts();
  }

  loadPendingPosts() {
    this.adminService.getAllPendingPosts().subscribe(
      (data) => {
        this.pendingPosts = data;
      },
      (error) => {
        console.warn('Some error occurred while fetching pending posts!');
      }
    );
  }

  acceptPost(post: any): void {
    this.adminService.acceptPostById(post.id).subscribe(
      (data) => {
        // Update the status of the post to accepted in the frontend
        post.status = 'ACCEPTED';
      },
      (error) => {
        console.warn('Some error occurred while accepting the post!');
      }
    );
  }

  rejectPost(post: any) {
    this.adminService.rejectPostById(post.id).subscribe(
      (data) => {
        // Update the status of the post to rejected in the frontend
        post.status = 'REJECTED';
      },
      (error) => {
        console.warn('Some error occurred while rejecting the post!');
      }
    );
  }
}
