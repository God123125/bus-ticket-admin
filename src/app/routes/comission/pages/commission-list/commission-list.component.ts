import { Component, signal, ViewEncapsulation } from '@angular/core';
import { SummaryCardComponent } from '../../../dashboard/components/summary-card/summary-card.component';
import { TranslatePipe } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommissionService } from '../../service/commission.service';
import { Commission, StatusCount } from '../../model/commission';
import { CommonModule, CurrencyPipe, LowerCasePipe, NgClass } from '@angular/common';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { DateTime } from 'luxon';
import { ConfirmMessageDirective } from '../../../../shared/confirm-dialog-helper/directives/confirm-message.directive';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/yyyy',
  },
  display: {
    dateInput: 'MM/yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};
@Component({
  selector: 'app-commission-list',
  imports: [
    SummaryCardComponent,
    TranslatePipe,
    MatIconModule,
    MatButtonModule,
    CurrencyPipe,
    LowerCasePipe,
    NgClass,
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    ReactiveFormsModule,
    ConfirmMessageDirective,
  ],
  templateUrl: './commission-list.component.html',
  styleUrl: './commission-list.component.scss',
  providers: [provideLuxonDateAdapter(MY_FORMATS)],
})
export class CommissionListComponent {
  commissionList = signal<Commission[]>([]);
  statusCount = signal<StatusCount>({} as any);
  readonly date = new FormControl<DateTime>(DateTime.now());

  setMonthAndYear(normalizedMonthAndYear: DateTime, datepicker: MatDatepicker<DateTime>) {
    const ctrlValue = DateTime.fromObject({
      month: normalizedMonthAndYear.month,
      year: normalizedMonthAndYear.year,
    });
    this.date.setValue(ctrlValue);
    datepicker.close();
  }
  constructor(private commissionService: CommissionService) {}
  ngOnInit(): void {
    this.getStatusCount();
  }
  getList() {
    const payload = {
      date: new Date(this.date.value as any).toISOString(),
    };
    this.commissionService.getMany(payload).subscribe({
      next: (res) => {
        this.commissionList.set(res.list);
      },
    });
  }
  getStatusCount() {
    this.commissionService.getStatus().subscribe({
      next: (res) => {
        this.statusCount.set(res.data);
      },
    });
  }
  onSearch() {
    this.getList();
  }
  onConfirmCommission(companyId: string) {
    const payload = {
      date: new Date(this.date.value as any).toISOString(),
      company: companyId,
    };
    this.commissionService.markAsPaid(payload).subscribe({
      next: () => {
        this.getList();
      },
    });
  }
}
