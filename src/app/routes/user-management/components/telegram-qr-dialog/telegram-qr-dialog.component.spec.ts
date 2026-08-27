import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelegramQrDialogComponent } from './telegram-qr-dialog.component';

describe('TelegramQrDialogComponent', () => {
  let component: TelegramQrDialogComponent;
  let fixture: ComponentFixture<TelegramQrDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelegramQrDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TelegramQrDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
