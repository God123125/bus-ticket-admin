import { Component, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { BusFormComponent } from '../bus-form/bus-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BusService } from '../../service/bus.service';
import { Bus } from '../../model/bus';
import { ConfirmMessageDirective } from '../../../../shared/confirm-dialog-helper/directives/confirm-message.directive';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-bus-list',
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    TranslatePipe,
    MatIconModule,
    MatInputModule,
    ConfirmMessageDirective,
    MatPaginatorModule,
  ],
  templateUrl: './bus-list.component.html',
  styleUrl: './bus-list.component.scss',
})
export class BusListComponent {
  queryParams = {
    page: 1,
    limit: 10,
    search: '',
  };
  buses = signal<Bus[]>([]);
  total = signal(0);
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private busService: BusService,
  ) {
    this.getList();
  }
  getList() {
    this.busService.getMany(this.queryParams).subscribe({
      next: (res) => {
        this.buses.set(res.list);
        this.total.set(res.total);
      },
    });
  }
  onAddBus() {
    const dialogRef = this.dialog.open(BusFormComponent, {
      width: '700px',
      maxWidth: '90vw',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.busService.create(res).subscribe({
            next: () => {
              this.snackBar.open('Bus created successfully!', 'OK', { duration: 3000 });
              this.getList();
            },
          });
        }
      },
    });
  }
  onSearch(event: KeyboardEvent) {
    const search = (event.target as HTMLInputElement).value;
    this.queryParams.search = search;
    this.getList();
  }
  onDelete(id: string) {
    this.busService.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Bus deleted successfully!', 'OK', { duration: 3000 });
        this.getList();
      },
    });
  }
  onEdit(id: string) {
    const dialogRef = this.dialog.open(BusFormComponent, {
      width: '700px',
      maxWidth: '90vw',
      disableClose: true,
      data: {
        id: id,
      },
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.busService.update(id, res).subscribe({
            next: () => {
              this.snackBar.open('Bus updated successfully!', 'OK', { duration: 3000 });
              this.getList();
            },
          });
        }
      },
    });
  }
  onPageChange(event: PageEvent) {
    this.queryParams.page = event.pageIndex + 1;
    this.queryParams.limit = event.pageSize;
    this.getList();
  }
}
