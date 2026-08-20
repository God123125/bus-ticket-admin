import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeographyFormComponent } from './geography-form.component';

describe('GeographyFormComponent', () => {
  let component: GeographyFormComponent;
  let fixture: ComponentFixture<GeographyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeographyFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GeographyFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
