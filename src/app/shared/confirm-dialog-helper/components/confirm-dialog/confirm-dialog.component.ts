import { Component, Inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatDialogModule, TranslatePipe, MatButtonModule, MatIconModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent {
  message: string = '';
  title: string = '';
  imgUrl: string = '';
  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string; title: string; imgUrl: string },
  ) {
    this.message = data.message;
    this.title = data.title;
    this.imgUrl = data.imgUrl;
  }
  onConfirm() {
    this.dialogRef.close(true);
  }
}
