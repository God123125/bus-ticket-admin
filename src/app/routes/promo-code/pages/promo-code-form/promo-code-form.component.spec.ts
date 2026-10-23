import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoCodeFormComponent } from './promo-code-form.component';

describe('PromoCodeFormComponent', () => {
  let component: PromoCodeFormComponent;
  let fixture: ComponentFixture<PromoCodeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromoCodeFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PromoCodeFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
