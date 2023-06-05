import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDetailsPostsComponent } from './admin-details-posts.component';

describe('AdminDetailsPostsComponent', () => {
  let component: AdminDetailsPostsComponent;
  let fixture: ComponentFixture<AdminDetailsPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDetailsPostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDetailsPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
