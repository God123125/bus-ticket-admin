import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementListComponent } from './user-management-list.component';

describe('UserManagementListComponent', () => {
  let component: UserManagementListComponent;
  let fixture: ComponentFixture<UserManagementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManagementListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserManagementListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
