import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { ConfirmMessageDirective } from '../../../../shared/confirm-dialog-helper/directives/confirm-message.directive';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TripService } from '../../service/trip.service';
import { Trip } from '../../model/trip';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TimePipe } from '../../../../shared/pipes/time-pipe';
@Component({
  selector: 'app-trip-list',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe,
    RouterLink,
    ConfirmMessageDirective,
    MatPaginatorModule,
    DatePipe,
    MatDatepickerModule,
    TimePipe,
    CurrencyPipe,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './trip-list.component.html',
  styleUrl: './trip-list.component.scss',
})
export class TripListComponent implements OnInit {
  params = {
    page: 1,
    limit: 10,
    departure_date: '',
  };
  trips = signal<Trip[]>([]);
  total = signal(0);

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.tripService.getMany(this.params).subscribe({
      next: (res) => {
        this.trips.set(res.list);
        this.total.set(res.total);
      },
      error: (err) => {
        console.error('getMany failed:', err);
      },
    });
  }

  onDelete(id: string) {
    this.tripService.delete(id).subscribe({
      next: () => {
        this.getList();
      },
    });
  }

  onDateChange(date: Date) {
    this.params.departure_date = date.toISOString();
    this.getList();
  }
  onPageChange(event: PageEvent) {
    this.params.page = event.pageIndex + 1;
    this.params.limit = event.pageSize;
    this.getList();
  }
}
