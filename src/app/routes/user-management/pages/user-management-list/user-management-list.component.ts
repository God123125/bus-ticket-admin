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
import { MatDialog } from '@angular/material/dialog';
import { TelegramQrDialogComponent } from '../../components/telegram-qr-dialog/telegram-qr-dialog.component';
import { EMPTY, Subject, switchMap, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  destroy$ = new Subject<void>();
  constructor(
    private userService: UserManagementService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}
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

  onOpenTelegramQr(id: string) {
    this.userService
      .checkIsUserLinked(id)
      .pipe(
        switchMap((res) => {
          if (res.is_linked) {
            // handle "already linked" case — replace with a snackbar/toast instead of alert
            this.snackBar.open('This account is already linked to Telegram', 'Close', {
              duration: 3000,
            });
            return EMPTY;
          }
          return this.userService.getTelegramQrUrl(id);
        }),
        switchMap((qrRes: any) => {
          const dialogRef = this.dialog.open(TelegramQrDialogComponent, {
            data: {
              qr: qrRes?.qrDataUrl,
              duration: qrRes?.expiredIn,
              userId: id,
            },
            width: '400px',
            disableClose: true,
          });
          return dialogRef.afterClosed();
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: () => {
          setTimeout(() => this.getList(), 3000);
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Something went wrong', 'Close', { duration: 3000 });
        },
      });
  }
}
