import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlyCommissionLineChartComponent } from './yearly-commission-line-chart.component';

describe('YearlyCommissionLineChartComponent', () => {
  let component: YearlyCommissionLineChartComponent;
  let fixture: ComponentFixture<YearlyCommissionLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearlyCommissionLineChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(YearlyCommissionLineChartComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
