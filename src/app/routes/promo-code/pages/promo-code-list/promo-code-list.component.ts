import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TranslatePipe } from '@ngx-translate/core';
import { PromoCodeFormComponent } from '../promo-code-form/promo-code-form.component';
import { PromoCodeService } from '../../service/promo-code.service';
import { PromoCode } from '../../model/promo-code';
import { DatePipe } from '@angular/common';
import { ConfirmMessageDirective } from '../../../../shared/confirm-dialog-helper/directives/confirm-message.directive';

@Component({
  selector: 'app-promo-code-list',
  imports: [
    TranslatePipe,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    DatePipe,
    ConfirmMessageDirective,
  ],
  templateUrl: './promo-code-list.component.html',
  styleUrl: './promo-code-list.component.scss',
})
export class PromoCodeListComponent {
  promoCodes = signal<PromoCode[]>([]);
  total = signal<number>(0);
  queryParams = {
    page: 1,
    limit: 10,
  };
  constructor(
    private dialog: MatDialog,
    private promoCodeService: PromoCodeService,
  ) {}
  ngOnInit(): void {
    this.getList();
  }
  getList() {
    this.promoCodeService.getMany(this.queryParams).subscribe({
      next: (res) => {
        this.promoCodes.set(res.list);
        this.total.set(res.total);
      },
    });
  }
  onAddPromoCode() {
    this.dialog.open(PromoCodeFormComponent, {
      width: '600px',
    });
  }
  onPageChange(event: PageEvent) {
    this.queryParams.page = event.pageIndex + 1;
    this.queryParams.limit = event.pageSize;
    this.getList();
  }
  onDelete(id: string) {}
}
