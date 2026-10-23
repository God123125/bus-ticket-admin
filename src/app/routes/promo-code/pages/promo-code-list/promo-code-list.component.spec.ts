import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoCodeListComponent } from './promo-code-list.component';

describe('PromoCodeListComponent', () => {
  let component: PromoCodeListComponent;
  let fixture: ComponentFixture<PromoCodeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromoCodeListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PromoCodeListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
