import { Component, signal } from '@angular/core';
import { SummaryCardComponent } from '../../../dashboard/components/summary-card/summary-card.component';
import { TranslatePipe } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommissionService } from '../../service/commission.service';
import { Commission, StatusCount } from '../../model/commission';
import { CommonModule, CurrencyPipe, LowerCasePipe, NgClass } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
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
  ],
  templateUrl: './commission-list.component.html',
  styleUrl: './commission-list.component.scss',
  providers: [provideNativeDateAdapter(MY_FORMATS)],
})
export class CommissionListComponent {
  commissionList = signal<Commission[]>([]);
  statusCount = signal<StatusCount>({} as any);
  date = new FormControl<Date | null>(null);
  constructor(private commissionService: CommissionService) {}
  ngOnInit(): void {
    this.getList();
    this.getStatusCount();
  }
  getList() {
    this.commissionService.getMany().subscribe({
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
}
