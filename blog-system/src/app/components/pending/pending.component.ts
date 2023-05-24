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
        this.pendingPosts = data.filter((post: any) => post.status === 'PENDING');
      },
      (error) => {
        console.warn('Some error occurred while fetching pending posts!');
      }
    );
  }

  acceptPost(post: any): void {
    this.adminService.acceptPostById(post.id).subscribe(
      (data) => {
        // Remove the accepted post from the array
        this.pendingPosts = this.pendingPosts.filter((p: any) => p.id !== post.id);
      },
      (error) => {
        console.warn('Some error occurred while accepting the post!');
      }
    );
  }

  rejectPost(post: any) {
    this.adminService.rejectPostById(post.id).subscribe(
      (data) => {
        // Remove the rejected post from the array
        this.pendingPosts = this.pendingPosts.filter((p: any) => p.id !== post.id);
      },
      (error) => {
        console.warn('Some error occurred while rejecting the post!');
      }
    );
  }
}
