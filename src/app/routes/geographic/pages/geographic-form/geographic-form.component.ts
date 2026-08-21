import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FormHelperComponent } from '../../../../shared/form-helper/form-helper.component';

@Component({
  selector: 'app-geography-form',
  imports: [
    TranslatePipe,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterLink,
    FormHelperComponent,
  ],
  templateUrl: './geographic-form.component.html',
  styleUrl: './geographic-form.component.scss',
})
export class GeographicFormComponent {
  form = new FormGroup({
    name_kh: new FormControl('', [Validators.required]),
    name_en: new FormControl(''),
  });

  constructor() {}
}
