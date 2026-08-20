import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeographyListComponent } from './geography-list.component';

describe('GeographyListComponent', () => {
  let component: GeographyListComponent;
  let fixture: ComponentFixture<GeographyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeographyListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GeographyListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
