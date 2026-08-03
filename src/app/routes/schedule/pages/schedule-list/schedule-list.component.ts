import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { ConfirmMessageDirective } from '../../../../shared/confirm-dialog-helper/directives/confirm-message.directive';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ScheduleService } from '../../service/schedule.service';
import { Schedule } from '../../model/schedule';
import { StationService } from '../../../station/service/station.service';
import { Station } from '../../../station/model/station';
import { TimePipe } from '../../../../shared/pipes/time-pipe';

@Component({
  selector: 'app-schedule-list',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe,
    RouterLink,
    ConfirmMessageDirective,
    MatPaginatorModule,
    TimePipe,
  ],
  templateUrl: './schedule-list.component.html',
  styleUrl: './schedule-list.component.scss',
})
export class ScheduleListComponent implements OnInit {
  params = {
    page: 1,
    limit: 10,
    search: '',
  };
  schedules = signal<Schedule[]>([]);
  stations = signal<Station[]>([]);
  total = signal(0);

  constructor(
    private scheduleService: ScheduleService,
    private stationService: StationService,
  ) {}

  ngOnInit(): void {
    this.loadStations();
    this.getList();
  }

  loadStations() {
    this.stationService.getMany().subscribe({
      next: (res) => {
        this.stations.set(res.list);
      },
    });
  }

  getList() {
    this.scheduleService.getMany(this.params).subscribe({
      next: (res) => {
        this.schedules.set(res.list);
        this.total.set(res.total);
      },
      error: (err) => {
        console.error('getMany failed:', err);
      },
    });
  }

  onDelete(id: string) {
    this.scheduleService.delete(id).subscribe({
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

  getStationName(station: string | Station | undefined): string {
    if (!station) return '';
    if (typeof station === 'object' && 'station_name' in station) {
      return station.station_name;
    }
    const found = this.stations().find((s) => s._id === station);
    return found ? found.station_name : (station as string);
  }
}
