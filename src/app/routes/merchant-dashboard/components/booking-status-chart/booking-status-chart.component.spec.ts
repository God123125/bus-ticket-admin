import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingStatusChartComponent } from './booking-status-chart.component';

describe('BookingStatusChartComponent', () => {
  let component: BookingStatusChartComponent;
  let fixture: ComponentFixture<BookingStatusChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingStatusChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingStatusChartComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
