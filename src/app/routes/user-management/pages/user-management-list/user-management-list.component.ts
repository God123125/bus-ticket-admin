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
  ],
  templateUrl: './user-management-list.component.html',
  styleUrl: './user-management-list.component.scss',
})
export class UserManagementListComponent {
  params = {
    page: 1,
    limit: 10,
  };
  users = signal<User[]>([]);
  constructor(private userService: UserManagementService) {}
  ngOnInit(): void {
    this.getList();
  }
  getList() {
    this.userService.getMany(this.params).subscribe({
      next: (res) => {
        this.users.set(res.list);
      },
      error: (err) => {
        console.error('getMany failed:', err);
      },
    });
  }
}
