import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHelperComponent } from './form-helper.component';

describe('FormHelperComponent', () => {
  let component: FormHelperComponent;
  let fixture: ComponentFixture<FormHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormHelperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormHelperComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
