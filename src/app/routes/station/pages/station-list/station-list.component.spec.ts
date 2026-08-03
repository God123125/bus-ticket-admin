import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationListComponent } from './station-list.component';

describe('StationListComponent', () => {
  let component: StationListComponent;
  let fixture: ComponentFixture<StationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StationListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
