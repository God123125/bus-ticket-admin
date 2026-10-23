import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslatePipe } from '@ngx-translate/core';
import { FormHelperComponent } from '../../../../shared/form-helper/form-helper.component';
import { DiscountTypeEnum } from '../../../../models/enum/discount-type.enum';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { PromoCodeService } from '../../service/promo-code.service';
@Component({
  selector: 'app-promo-code-form',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    TranslatePipe,
    ReactiveFormsModule,
    FormHelperComponent,
    MatDatepickerModule,
  ],
  templateUrl: './promo-code-form.component.html',
  styleUrl: './promo-code-form.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class PromoCodeFormComponent {
  form = new FormGroup({
    code: new FormControl('', [Validators.required]),
    discountType: new FormControl('', [Validators.required]),
    value: new FormControl(0, [Validators.required]),
    is_active: new FormControl(true),
    expiresAt: new FormControl<Date | null>(null),
    maxUses: new FormControl(0),
  });
  discountTypes = Object.values(DiscountTypeEnum);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id?: string },
    public dialogRef: MatDialogRef<PromoCodeFormComponent>,
    private promoCodeService: PromoCodeService,
  ) {
    if (this.data?.id) {
      this.promoCodeService.getById(this.data.id).subscribe({
        next: (res) => {
          this.form.patchValue({
            code: res.code,
            discountType: res.discountType,
            value: res.value,
            is_active: res.is_active,
            expiresAt: new Date(res.expiresAt),
            maxUses: res.maxUses,
          });
        },
      });
    }
  }
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload = {
      ...this.form.value,
    };
    this.dialogRef.close(payload);
  }
}
