import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { UserManagementService } from '../../services/user-management.service';
import { User } from '../../model/user';
import { ImgUrlPipe } from '../../../../shared/pipes/img-url-pipe';
import { ConfirmMessageDirective } from '../../../../shared/confirm-dialog-helper/directives/confirm-message.directive';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-user-management-list',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe,
    RouterLink,
    ImgUrlPipe,
    ConfirmMessageDirective,
    MatPaginatorModule,
  ],
  templateUrl: './user-management-list.component.html',
  styleUrl: './user-management-list.component.scss',
})
export class UserManagementListComponent {
  params = {
    page: 1,
    limit: 10,
    search: '',
  };
  users = signal<User[]>([]);
  total = signal(0);
  constructor(private userService: UserManagementService) {}
  ngOnInit(): void {
    this.getList();
  }
  getList() {
    this.userService.getMany(this.params).subscribe({
      next: (res) => {
        this.users.set(res.list);
        this.total.set(res.total);
      },
      error: (err) => {
        console.error('getMany failed:', err);
      },
    });
  }
  onDelete(id: string) {
    this.userService.delete(id).subscribe({
      next: (res) => {
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
