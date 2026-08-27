import { Component, Inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-telegram-qr-dialog',
  imports: [MatDialogModule, TranslatePipe, MatButtonModule],
  templateUrl: './telegram-qr-dialog.component.html',
  styleUrl: './telegram-qr-dialog.component.scss',
})
export class TelegramQrDialogComponent {
  qr?: string;
  constructor(@Inject(MAT_DIALOG_DATA) data: { qr: string }) {
    this.qr = data.qr;
  }
}
