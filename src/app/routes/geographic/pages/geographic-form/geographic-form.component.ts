import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FormHelperComponent } from '../../../../shared/form-helper/form-helper.component';
import { GeographicService } from '../../service/geographic.service';
import { Geographic } from '../../model/geographic';

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
  updateId: string = '';
  constructor(
    private geographicService: GeographicService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe((params) => {
      this.updateId = params['id'];
      if (this.updateId) {
        this.loadGeographic(this.updateId);
      }
    });
  }
  loadGeographic(id: string) {
    this.geographicService.getById(id).subscribe({
      next: (res) => {
        this.form.patchValue(res);
      },
    });
  }
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.geographicService.create(this.form.value as unknown as Geographic).subscribe({
      next: (res) => {
        this.router.navigate(['../'], { relativeTo: this.route });
      },
    });
  }
}
