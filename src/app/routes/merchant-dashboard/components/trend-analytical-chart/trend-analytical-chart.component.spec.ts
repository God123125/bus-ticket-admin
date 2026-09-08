import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendAnalyticalChartComponent } from './trend-analytical-chart.component';

describe('TrendAnalyticalChartComponent', () => {
  let component: TrendAnalyticalChartComponent;
  let fixture: ComponentFixture<TrendAnalyticalChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendAnalyticalChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrendAnalyticalChartComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
