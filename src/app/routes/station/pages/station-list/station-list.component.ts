import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { StationService } from '../../service/station.service';
import { Station } from '../../model/station';
import { ConfirmMessageDirective } from '../../../../shared/confirm-dialog-helper/directives/confirm-message.directive';

@Component({
  selector: 'app-station-list',
  imports: [
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    TranslatePipe,
    RouterModule,
    ConfirmMessageDirective,
  ],
  templateUrl: './station-list.component.html',
  styleUrl: './station-list.component.scss',
})
export class StationListComponent {
  params = {
    page: 1,
    limit: 10,
    search: '',
  };
  total = signal(0);
  stations = signal<Station[]>([]);
  constructor(private stationService: StationService) {}
  ngOnInit(): void {
    this.getList();
  }
  getList() {
    this.stationService.getMany(this.params).subscribe({
      next: (res) => {
        this.stations.set(res.list);
        this.total.set(res.total);
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
  }
  onDelete(id: string) {}
}
