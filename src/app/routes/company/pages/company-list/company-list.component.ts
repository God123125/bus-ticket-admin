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
import { MatPaginator, PageEvent } from '@angular/material/paginator';

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
    MatPaginator,
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
  total = signal(0);
  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.companyService.getMany(this.params).subscribe({
      next: (res) => {
        this.companies.set(res.list);
        this.total.set(res.total);
      },
      error: (err) => {
        console.error('getMany failed:', err);
      },
    });
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
  onPageChange(event: PageEvent) {
    this.params.page = event.pageIndex + 1;
    this.params.limit = event.pageSize;
    this.getList();
  }
}
