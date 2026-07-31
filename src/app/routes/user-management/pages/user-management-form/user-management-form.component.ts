import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FormHelperComponent } from '../../../../shared/form-helper/form-helper.component';
import { UserManagementService } from '../../services/user-management.service';

@Component({
  selector: 'app-user-management-form',
  imports: [
    TranslatePipe,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink,
    FormHelperComponent,
  ],
  templateUrl: './user-management-form.component.html',
  styleUrl: './user-management-form.component.scss',
})
export class UserManagementFormComponent {
  @ViewChild('fileInput')
  uploadProfile!: ElementRef;
  profile: string = '';
  uploadFile?: File;
  form = new FormGroup({
    username: new FormControl<string | null>(null, [Validators.required, Validators.minLength(3)]),
    password: new FormControl<string | null>(null, [Validators.required, Validators.minLength(8)]),
    tel: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(10),
    ]),
    address: new FormControl<string | null>(null),
  });
  constructor(
    private userManagementService: UserManagementService,
    private router: Router,
  ) {}
  onFileSelected(event: Event) {
    try {
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const file = files[0];
        this.uploadFile = file;
        this.profile = URL.createObjectURL(file);
      }
    } catch (error) {
      (this.uploadProfile.nativeElement as HTMLInputElement).value = '';
    }
  }
  onSave() {
    const payload = {
      ...this.form.value,
      profile: this.uploadFile,
    };
    this.userManagementService.createUser(payload).subscribe({
      next: (res) => {
        this.router.navigate(['../']);
      },
    });
  }
}
