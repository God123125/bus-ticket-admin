import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-telegram-qr-dialog',
  imports: [MatDialogModule, TranslatePipe, MatButtonModule],
  templateUrl: './telegram-qr-dialog.component.html',
  styleUrl: './telegram-qr-dialog.component.scss',
})
export class TelegramQrDialogComponent implements OnInit, OnDestroy {
  qr: string = '';
  timeLeft: number = 60; // in seconds
  timerInterval: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: { qr: string; duration?: number },
    private cdr: ChangeDetectorRef,
  ) {
    this.qr = data.qr;
    if (data.duration) {
      // If API returns milliseconds (> 1000), convert to seconds, otherwise use as-is
      this.timeLeft =
        data.duration > 1000 ? Math.floor(data.duration / 1000) : Number(data.duration);
    }
  }

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer(): void {
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.cdr.markForCheck(); // Trigger Angular UI update
      } else {
        this.stopCountdown();
        this.cdr.markForCheck();
      }
    }, 1000);
  }

  get formattedTime(): string {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  stopCountdown(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  ngOnDestroy(): void {
    this.stopCountdown();
  }
}
