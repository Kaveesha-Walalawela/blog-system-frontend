import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWarningsComponent } from './user-warnings.component';

describe('UserWarningsComponent', () => {
  let component: UserWarningsComponent;
  let fixture: ComponentFixture<UserWarningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserWarningsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserWarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
