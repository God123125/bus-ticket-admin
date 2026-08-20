import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FormHelperComponent } from '../../../../shared/form-helper/form-helper.component';
import { UserManagementService } from '../../services/user-management.service';
import { CompanyService } from '../../../company/service/company.service';
import { Company } from '../../../company/model/company';
import { MatSelectModule } from '@angular/material/select';
import { LocalStorageService } from '../../../../services/local-storage.service';

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
    MatSelectModule,
  ],
  templateUrl: './user-management-form.component.html',
  styleUrl: './user-management-form.component.scss',
})
export class UserManagementFormComponent {
  @ViewChild('fileInput')
  uploadProfile!: ElementRef;
  profile: string = '';
  uploadFile?: File;
  updateId: string = '';
  form = new FormGroup({
    full_name: new FormControl<string | null>(null, [Validators.required]),
    username: new FormControl<string | null>(null, [Validators.required, Validators.minLength(3)]),
    password: new FormControl<string | null>(null, [Validators.required, Validators.minLength(8)]),
    tel: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(10),
    ]),
    address: new FormControl<string | null>(null),
    bank_acc_name: new FormControl<string | null>(null),
    bank_acc_number: new FormControl<string | null>(null),
    company: new FormControl<string | null>(null),
  });
  companies = signal<Company[]>([]);
  isAdmin = signal<boolean>(false);
  constructor(
    private userManagementService: UserManagementService,
    private router: Router,
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private localStorageService: LocalStorageService,
  ) {
    this.isAdmin.set(this.localStorageService.isAdmin());
    if (this.isAdmin()) {
      this.loadCompany();
    }
    this.route.params.subscribe((params) => {
      this.updateId = params['id'] ?? '';
      if (this.updateId) {
        this.loadUser(this.updateId);
      }
    });
  }
  loadCompany() {
    this.companyService.getMany().subscribe({
      next: (res) => {
        this.companies.set(res.list);
      },
    });
  }
  loadUser(id: string) {
    this.userManagementService.getById(id).subscribe({
      next: (res) => {
        this.form.controls.password.disable();
        this.form.patchValue({
          username: res.username,
          tel: res.tel,
          address: res.address,
          bank_acc_name: res.bank_acc_name,
          bank_acc_number: res.bank_acc_number,
          full_name: res.full_name,
          company: res.company,
        });
        if (res.profile) {
          this.profile = res.profile;
        }
      },
    });
  }
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
    const payload: any = {
      username: this.form.value.username || '',
      tel: this.form.value.tel || '',
      address: this.form.value.address || '',
      profile: this.uploadFile,
      bank_acc_name: this.form.value.bank_acc_name || '',
      bank_acc_number: this.form.value.bank_acc_number || '',
      full_name: this.form.value.full_name || '',
      company: this.form.value.company || '',
    };
    if (this.form.value.password !== '' || this.form.value.password !== null) {
      payload.password = this.form.value.password;
    }
    if (this.updateId) {
      this.userManagementService.updateUser(this.updateId, payload).subscribe({
        next: (res) => {
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
      });
    } else {
      this.userManagementService.createUser(payload).subscribe({
        next: (res) => {
          this.router.navigate(['../'], { relativeTo: this.route });
        },
      });
    }
  }
}
