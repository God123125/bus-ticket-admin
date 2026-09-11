import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBookedCompanyComponent } from './top-booked-company.component';

describe('TopBookedCompanyComponent', () => {
  let component: TopBookedCompanyComponent;
  let fixture: ComponentFixture<TopBookedCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopBookedCompanyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopBookedCompanyComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
