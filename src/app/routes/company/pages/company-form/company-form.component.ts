import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FormHelperComponent } from '../../../../shared/form-helper/form-helper.component';
import { CompanyService } from '../../service/company.service';
import { UserManagementService } from '../../../user-management/services/user-management.service';
import { User } from '../../../user-management/model/user';
import { ImgUrlPipe } from '../../../../shared/pipes/img-url-pipe';

@Component({
  selector: 'app-company-form',
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
    ImgUrlPipe,
  ],
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.scss',
})
export class CompanyFormComponent implements OnInit {
  @ViewChild('fileInput') uploadImage!: ElementRef;
  image: string = '';
  uploadFile?: File;
  updateId: string = '';
  users: User[] = [];

  form = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.required]),
    commission_fee: new FormControl<number | null>(0, [Validators.required, Validators.min(0)]),
    is_active: new FormControl<boolean>(true),
    owner: new FormControl<string | null>(null, [Validators.required]),
  });

  constructor(
    private companyService: CompanyService,
    private userService: UserManagementService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.route.params.subscribe((params) => {
      this.updateId = params['id'] ?? '';
      if (this.updateId) {
        this.loadCompany(this.updateId);
      }
    });
  }

  loadUsers() {
    this.userService.getMany({ page: 1, limit: 100 }).subscribe({
      next: (res) => {
        this.users = res.list;
      },
    });
  }

  loadCompany(id: string) {
    this.companyService.getById(id).subscribe({
      next: (res) => {
        this.form.patchValue({
          name: res.name,
          commission_fee: res.commission_fee ?? 0,
          is_active: res.is_active ?? true,
          owner: res.owner as string,
        });
        if (res.image) {
          this.image = res.image;
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
        this.image = URL.createObjectURL(file);
      }
    } catch (error) {
      (this.uploadImage.nativeElement as HTMLInputElement).value = '';
    }
  }

  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload: any = {
      name: this.form.value.name || '',
      commission_fee: this.form.value.commission_fee ?? 0,
      is_active: this.form.value.is_active ?? true,
      owner: this.form.value.owner || '',
    };
    if (this.uploadFile) {
      payload.image = this.uploadFile;
    }

    if (this.updateId) {
      this.companyService.updateCompany(this.updateId, payload).subscribe({
        next: () => {
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
      });
    } else {
      this.companyService.createCompany(payload).subscribe({
        next: () => {
          this.router.navigate(['../'], { relativeTo: this.route });
        },
      });
    }
  }
}
