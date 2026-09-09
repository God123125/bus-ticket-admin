import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBookedDestinationsComponent } from './top-booked-destinations.component';

describe('TopBookedDestinationsComponent', () => {
  let component: TopBookedDestinationsComponent;
  let fixture: ComponentFixture<TopBookedDestinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopBookedDestinationsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopBookedDestinationsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
