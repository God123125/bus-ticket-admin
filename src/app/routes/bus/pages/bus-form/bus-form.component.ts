import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslatePipe } from '@ngx-translate/core';
import { BusService } from '../../service/bus.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BusType } from '../../model/bus-type.enum';
import { FormHelperComponent } from '../../../../shared/form-helper/form-helper.component';

@Component({
  selector: 'app-bus-form',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    TranslatePipe,
    ReactiveFormsModule,
    FormHelperComponent,
  ],
  templateUrl: './bus-form.component.html',
  styleUrl: './bus-form.component.scss',
})
export class BusFormComponent {
  selectedFiles: (File | null)[] = [null, null, null];
  previewUrls: (string | null)[] = [null, null, null];
  busTypes = Object.values(BusType);

  form = new FormGroup({
    model_name: new FormControl('', [Validators.required]),
    plate_number: new FormControl('', [Validators.required]),
    type: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(
    private busService: BusService,
    private dialogRef: MatDialogRef<BusFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id?: string },
  ) {
    if (this.data?.id) {
      this.busService.getById(this.data.id).subscribe({
        next: (res) => {
          this.form.patchValue(res);
          if (res.images && Array.isArray(res.images)) {
            res.images.forEach((img: any, index: number) => {
              if (index < 3) {
                this.previewUrls[index] = typeof img === 'string' ? img : img?.url || null;
              }
            });
          }
        },
      });
    }
  }

  onFileSelected(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFiles[index] = file;
      this.previewUrls[index] = URL.createObjectURL(file);
    }
  }

  removeImage(index: number, inputEl?: HTMLInputElement) {
    this.selectedFiles[index] = null;
    this.previewUrls[index] = null;
    if (inputEl) {
      inputEl.value = '';
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const files = this.selectedFiles.filter((f): f is File => f !== null);
    const payload = {
      ...this.form.value,
      images: files,
    };
    this.dialogRef.close(payload);
  }
}
