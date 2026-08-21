import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ConfirmMessageDirective } from '../../../../shared/confirm-dialog-helper/directives/confirm-message.directive';
import { ImgUrlPipe } from '../../../../shared/pipes/img-url-pipe';

@Component({
  selector: 'app-geography-list',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe,
    RouterLink,
    MatPaginatorModule,
  ],
  templateUrl: './geographic-list.component.html',
  styleUrl: './geographic-list.component.scss',
})
export class GeographicListComponent {
  params = {
    page: 1,
    limit: 10,
    search: '',
  };
  total = signal(0);
  constructor() {}
  onSearch(event: KeyboardEvent) {
    const search = (event.target as HTMLInputElement).value;
    this.params.search = search;
  }
  onPageChange(event: PageEvent) {
    this.params.page = event.pageIndex + 1;
    this.params.limit = event.pageSize;
  }
}
