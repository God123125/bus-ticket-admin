import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyComparisonDoughnutComponent } from './company-comparison-doughnut.component';

describe('CompanyComparisonDoughnutComponent', () => {
  let component: CompanyComparisonDoughnutComponent;
  let fixture: ComponentFixture<CompanyComparisonDoughnutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyComparisonDoughnutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyComparisonDoughnutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
