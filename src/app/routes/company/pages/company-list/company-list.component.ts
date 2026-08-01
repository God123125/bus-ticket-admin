import { Component, signal, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { CompanyService } from '../../service/company.service';
import { Company } from '../../model/company';
import { User } from '../../../user-management/model/user';
import { ImgUrlPipe } from '../../../../shared/pipes/img-url-pipe';
import { ConfirmMessageDirective } from '../../../../shared/confirm-dialog-helper/directives/confirm-message.directive';

@Component({
  selector: 'app-company-list',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe,
    RouterLink,
    ImgUrlPipe,
    ConfirmMessageDirective,
  ],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss',
})
export class CompanyListComponent implements OnInit {
  params: any = {
    page: 1,
    limit: 10,
    search: '',
  };
  companies = signal<Company[]>([]);

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.companyService.getMany(this.params).subscribe({
      next: (res) => {
        this.companies.set(res.list);
      },
      error: (err) => {
        console.error('getMany failed:', err);
      },
    });
  }

  getOwnerName(owner: string | User | undefined): string {
    if (!owner) return '';
    if (typeof owner === 'object') {
      return owner.full_name || owner.username || owner._id;
    }
    return owner;
  }

  onDelete(id: string) {
    this.companyService.delete(id).subscribe({
      next: () => {
        this.getList();
      },
    });
  }
  onSearch(event: KeyboardEvent) {
    const search = (event.target as HTMLInputElement).value;
    this.params.search = search;
    this.getList();
  }
}
