import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionListComponent } from './commission-list.component';

describe('CommissionListComponent', () => {
  let component: CommissionListComponent;
  let fixture: ComponentFixture<CommissionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommissionListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommissionListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
