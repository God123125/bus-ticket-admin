import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationFormComponent } from './station-form.component';

describe('StationFormComponent', () => {
  let component: StationFormComponent;
  let fixture: ComponentFixture<StationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StationFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
