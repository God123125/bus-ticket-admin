import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslatePipe } from '@ngx-translate/core';
import { FormHelperComponent } from '../../../../shared/form-helper/form-helper.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-refund-dialog',
  imports: [
    MatDialogModule,
    TranslatePipe,
    FormHelperComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './refund-dialog.component.html',
  styleUrl: './refund-dialog.component.scss',
})
export class RefundDialogComponent {
  refundRate = new FormControl<number>(0);
  constructor(private dialog: MatDialogRef<RefundDialogComponent>) {}
  submit() {
    this.dialog.close(this.refundRate.value);
  }
}
